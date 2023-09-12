import { z } from 'zod'

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

export type SearchRequest = z.infer<typeof SearchRequest>

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
  async search(params: SearchRequest): Promise<URL> {
    params = SearchRequest.parse(params)

    const url = new URL('/holidays/search', this.host)
    url.searchParams.set('k', this.searchKey)

    Object.keys(params).forEach(k => {
      url.searchParams.set(k, 'V')
    })

    return url
  }
}