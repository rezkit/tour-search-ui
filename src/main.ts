import { createTracker } from '@elastic/behavioral-analytics-javascript-tracker'
export * as Components from './components'

const SEARCH_HOST = 'https://api.tours.rezkit.app'

export interface SearchRequest {
  ccy: string
  q?: string
  qs?: string
  c0?: string[]
  c1?: string[]
  c2?: string[]
  c3?: string[]
  c4?: string[]
  c5?: string[]
  c6?: string[]
  c7?: string[]
  c8?: string[]
  c9?: string[]
  l?:  { [key: string]: string[] }
  fh?: { [key: string]: string | number | boolean }
  fd?: { [key: string]: string | number | boolean }
  df?: string | Date
  dt?: string | Date
  pf?: string | Date
  pt?: string | Date
  s?: string[]
  i?: number
  j?: 'a' | 'd'
  o?: number
  pi?: number
}

interface SearchResponse {
  took: number
  timed_out: boolean
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score: number
    hits: SearchHit<HolidayHit>[]
  }
}

interface HolidayHit {
  name: string
  code: string
  type: 'holiday'
  published: boolean
  description: string
  duration: number[]
  categories: { [key: number]: string[] },
  locations: { [key: string]: string[] },
  organization_id: string
  image_ids: string[]
  ordering: number
}

interface SearchHit<T> {
  _index: string
  _id: string
  _score: number
  _routing?: string
  _source: T
}

export interface ClientOptions {
  host?: string | URL
}

/**
 * Search API Client
 */
export class Client {
  private searchKey: string
  private host: string | URL = SEARCH_HOST

  constructor(searchKey: string, options?: ClientOptions) {
    this.searchKey = searchKey

    // Parse the client options to ensure they're valid
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
    const url = new URL('/holidays/search', this.host)
    url.searchParams.set('k', this.searchKey)
    url.searchParams.set('ccy', params.ccy)

    const response = await fetch(url)
    const data = await response.json()

    tracker.trackSearch({
      search: {
        query: '',
        filters: {
          key: this.searchKey,
          currency: params.ccy,
        },
        page: { current: 1, size: 10 },
        results: {
          total_results: data.hits.total.value,
          items: data.hits.hits.map( (h: { _id: string, _index: string}) => ({
            document: { id: h._id, index: h._index },
            page: { url: `/holiday/${h._id}` }
          }))
        }
      }
    })
    return data 
  }
}

/**
 * Singleton tracker for tracking searches
 */
const tracker = createTracker({
  endpoint: "https://8e42b76e508c4d0e88ee46ccf1bbec82.eu-west-2.aws.cloud.es.io:443",
  collectionName: "tours-analytics",
  apiKey: "MjYxdWw0a0JCMGstWV9YeVh4MkQ6YmNNV2hhUV9RcDZTMlVPMk83VGpKZw=="
})