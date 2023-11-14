import { z } from 'zod'

/**
 * An array of non-empty strings
 */
const StringArray = z.array(z.string().min(1))

/**
 * Schema for a tour search request
 * 
 */
export const SearchRequest = z.object({
  ccy: z.string().nonempty(),
  q: z.string().optional(),
  qs: z.string().optional(),
  c0: StringArray.optional(),
  c1: StringArray.optional(),
  c2: StringArray.optional(),
  c3: StringArray.optional(),
  c4: StringArray.optional(),
  c5: StringArray.optional(),
  c6: StringArray.optional(),
  c7: StringArray.optional(),
  c8: StringArray.optional(),
  c9: StringArray.optional(),
  l: z.record(z.string(), StringArray).optional(),
  fh: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null(), StringArray])).optional(),
  fd: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null(), StringArray])).optional(),
  s: StringArray.optional(),
  i: z.coerce.number().min(1).max(200).optional(),
  o: z.coerce.number().min(0).optional(),
  pi: z.coerce.number().min(1).optional(),
  pf: z.coerce.number().min(0).optional(),
  pt: z.coerce.number().min(0).optional(),
  df: z.string().or(z.date()).optional(),
  dt: z.string().or(z.date()).optional(),
  j: z.literal('a').or(z.literal('d')).optional(),
}).refine( params => !(params.q && params.qs), { message: '`q` and `qs` are mutually exclusive' , path: ['q', 'qs'] } )


/**
 * A custom field value, which can be a primitive, or array of strings.
 */
const CustomFieldValue = z.union([ z.string(), z.number(), z.boolean(), z.array(z.string()), z.null()])

/**
 * Schema for a Holiday result payload
 */
const HolidaySource = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  published: z.boolean(),
  type: z.literal('holiday'),
  duration: z.array(z.number().int().nonnegative()),
  ordering: z.number().int().positive(),
  categories: z.record(z.array(z.string())),
  locations: z.record(z.array(z.string())).or(z.array(z.undefined())),
  custom_fields: z.record( CustomFieldValue ),
  images: z.array(z.any()),
}).required().passthrough()

const DepartureHit = z.object({
  _id: z.string(),
  _score: z.number().nonnegative(),
  _routing: z.string(),
  _source: z.object({
    type: z.literal('departure'),
    name: z.string(),
    code: z.string(),
    published: z.boolean(),
    duration: z.number().int().nonnegative(),
    kind: z.enum(['fixed', 'fixed_duration', 'flexible']),
    dates: z.object({
      lte: z.coerce.date(),
      gte: z.coerce.date(),
    }),
    lead_prices: z.record(z.array(z.coerce.number())),
  }).passthrough()
}).required()

const HolidayHit = z.object({
  _id: z.string(),
  _score: z.number().nonnegative(),
  _routing: z.string(),
  _source: HolidaySource,
  inner_hits: z.object({
    departure: z.object({
      hits: z.object({
        total: z.object({
          value: z.number().int().nonnegative(),
          relation: z.string()
        }),
        max_score: z.number().nonnegative().nullable(),
        hits: z.array(DepartureHit),
      }).required()
    }).required()
  }),
  calculated: z.object({
    lead_price: z.array(z.coerce.number()),
    months_of_operation: z.array(z.number().int().min(1).max(12)),
  }).required()
}).required()

const Aggregations = z.object({
  departures: z.object({
    doc_count: z.number().int().nonnegative(),
    matching: z.object({
      doc_count: z.number().int().nonnegative(),
      price_stats: z.object({
        count: z.number().int().nonnegative().nullable(),
        min: z.number().nullable(),
        max: z.number().nullable(),
        avg: z.number().nullable(),
        sum: z.number().nullable(),
      }).required(),
      price_histogram: z.object({
        buckets: z.array(z.object({
          key: z.number().nonnegative(),
          doc_count: z.number().int().nonnegative(),
        }).required())
      }),
      date_histogram: z.object({
        buckets: z.array(z.object({
          key: z.number().int().nonnegative(),
          key_as_string: z.coerce.date(),
          doc_count: z.number().int().nonnegative()
        }).required())
      }),
    })
  })
}).required().passthrough()

export const SearchResponse = z.object({
  took: z.number().int().nonnegative(),
  timed_out: z.boolean(),
  hits: z.object({
    total: z.object({
      value: z.number().int().nonnegative(),
      relation: z.string(),
    }),
    max_score: z.number().nonnegative().nullable(),
    hits: z.array(HolidayHit)
  }).required(),
  aggregations: Aggregations
}).required()


const SuggestionOption = z.object({
  text: z.string().nonempty(),
  _index: z.string(),
  _id: z.string(),
  _score: z.number().nonnegative(),
}).required()

const Suggestion = z.object({
  text: z.string().nonempty(),
  offset: z.number().int().nonnegative(),
  length: z.number().int().nonnegative(),
  options: z.array(SuggestionOption)
}).required()


export const SuggestResponse = z.record(z.array(Suggestion))
