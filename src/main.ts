import { z } from 'zod'
import { type App } from 'vue'
import * as components from '@/components'

const StringArray = z.array(z.string().nonempty())

const SearchRequest = z.object({
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
  l: z.record(z.string().nonempty(), StringArray).optional(),
  fh: z.record(z.string().nonempty(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  fd: z.record(z.string().nonempty(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  s: StringArray.optional(),
  i: z.coerce.number().min(1).max(200).optional(),
  o: z.coerce.number().min(0).optional(),
  pi: z.coerce.number().min(1).optional(),
  pf: z.coerce.number().min(0).optional(),
  pt: z.coerce.number().min(0).optional(),
  df: z.string().or(z.date()).optional(),
  dt: z.string().or(z.date()).optional(),
}).refine( params => !(params.q && params.qs), { message: '`q` and `qs` are mutually exclusive' , path: ['q', 'qs'] } )


const CustomFieldValue = z.union([ z.string(), z.number(), z.boolean(), z.array(z.string())])

const HolidaySource = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  published: z.boolean(),
  type: z.literal('holiday'),
  duration: z.array(z.number().int().nonnegative()),
  ordering: z.number().int().positive(),
  categories: z.record(z.array(z.string())),
  locations: z.record(z.array(z.string())),
  custom_fields: z.record( CustomFieldValue ),
  image_ids: z.array(z.string())
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
        max_score: z.number().nonnegative(),
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
        count: z.number().int().nonnegative(),
        min: z.number(),
        max: z.number(),
        avg: z.number(),
        sum: z.number(),
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

const SearchResponse = z.object({
  took: z.number().int().nonnegative(),
  timed_out: z.boolean(),
  hits: z.object({
    total: z.object({
      value: z.number().int().nonnegative(),
      relation: z.string(),
    }),
    max_score: z.number().nonnegative(),
    hits: z.array(HolidayHit)
  }).required(),
  aggregations: Aggregations
}).required()

export type SearchRequest = z.infer<typeof SearchRequest>
export type SearchResponse = z.infer<typeof SearchResponse>

export const SEARCH_HOST = 'https://api.tours.rezkit.app'

const ClientOptions = z.object({
  host: z.string().url(),
}).partial()

export type ClientOptions = z.infer<typeof ClientOptions>

export class Client {
  private searchKey: string
  private host: string = SEARCH_HOST

  constructor(searchKey: string, options?: ClientOptions) {
    this.searchKey = searchKey

    // Parse the client options to ensure they're valid
    if (options) {
      ClientOptions.parse(options)
    }

    if (options?.host) {
      this.host = options.host
    }
  }

  /**
   * 
   * @param _params 
   * @returns 
   */
  async search(params: SearchRequest): Promise<SearchResponse> {
    params = SearchRequest.parse(params)

    const url = new URL('/holidays/search', this.host)
    url.searchParams.set('k', this.searchKey)
    url.searchParams.set('ccy', params.ccy)

    const response = await fetch(url)
    const data = await response.json()
    return SearchResponse.parse(data)
  }
}

/**
 * Vue Plugin Module -- Exports some Vue components for building Search UIs
 */
export const vue = {
  install(Vue: App) {
    console.debug(Vue.version)

    Vue.component('SearchBox', components.SearchBox)
  }
}