import { createTracker } from '@elastic/behavioral-analytics-javascript-tracker'
export * as Components from './components'

const SEARCH_HOST = 'https://api.tours.rezkit.app'

export type CustomFieldsData = { [key: string]: string | number | boolean | null | string[] }

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

export interface SearchResponse {
  took: number
  timed_out: boolean
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score: number
    hits: HolidayHit[]
  }
  aggregations: Aggregations
}

interface CategoryBucket {
  key: string
  path: string[]
  term: string
  level: number
  doc_count: number
  children: CategoryBucket[]
}

interface Aggregations {
  categories: {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number 
    buckets: CategoryBucket[]
  }
  departures: {
    doc_count: number
    matching: {
      doc_count: number
      date_histogram: {
        buckets: Array<{
          key: number
          key_as_string: string
          doc_count: number
        }>
      }
      price_histogram: {
        buckets: Array<{key: number, doc_count: number}>
      }
      price_stats: {
        count: number
        min: number
        max: number
        avg: number
        sum: number
      }
    }
  }
}

interface HolidayHit {
  _index: string
  _id: string
  _score: number
  _routing?: string
  _source: {
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
    custom_fields: CustomFieldsData
  }
  calculated: {
    lead_prices: { [key: string]: number[] },
    months_of_operation: number[]
  }
  inner_hits: {
    departure: {
      hits: {
        total: {
          value: number
          relation: string
        }
        max_score: number
        hits: DepartureHit[]
      }
    }
  }
}

export interface DepartureHit {
  _index: string
  _id: string
  _score: number
  _routing?: string
  _source: {
    type: 'departure'
    name: string
    code: string
    published: boolean
    kind: 'fixed' | 'fixed_duration' | 'flexible'
    dates: {
      gte: string
      lte: string
    }
    duration: number
    lead_prices: { [key: string]: number[] }
    custom_fields: CustomFieldsData
  }
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
    const data = await response.json() as SearchResponse

    tracker.trackSearch({
      search: {
        query: params.q || params.qs || '',
        filters: this.getFilters(params),
        page: { current: params.o || 1, size: params.i || 10 },
        results: {
          total_results: data.hits.total.value,
          items: data.hits.hits.map( (h) => ({
            document: { id: h._id, index: h._index },
            page: { url: `/holiday/${h._id}` }
          }))
        }
      }
    })

    return data 
  }


  /**
   * Convert SearchRequest filters into analytics data.
   */
  private getFilters(params: SearchRequest): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {
      organization_key: this.searchKey,
      currency: params.ccy
    }

    if (params.l) {
      const locations: string[] = []
      for (const c in params.l) {
        locations.concat(params.l[c].map(l => c + ' > ' + l))
      }

      filters.locations = locations
    }

    return filters
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