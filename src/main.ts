import { z } from 'zod'
import * as components from './components'
export * as Filters from './filters'
import { SearchRequest, SearchResponse, SuggestResponse } from './search'

import './assets/scss/template.scss'

// ToDO: Testable data!
export const SEARCH_HOST = 'https://api.tours.rezkit.app'

/**
 * Schema for a tour search request
 */
export type SearchRequest = z.infer<typeof SearchRequest>
export type SearchResponse = z.infer<typeof SearchResponse>
export type SuggestResponse = z.infer<typeof SuggestResponse>

const ClientOptions = z.object({
  host: z.string().url(),
}).partial()

export type ClientOptions = z.infer<typeof ClientOptions>

/**
 * A Client interface to the RezKit Tour Search
 *
 * Handles configuration of search along with validating, sending, and receiving queries
 */
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
   * Perform a search
   *
   * @param params
   * @returns
   */
  async search(params: SearchRequest): Promise<SearchResponse> {
    params = SearchRequest.parse(params)

    const url = this.getUrl('search', params)

    const response = await fetch(url)
    const data = await response.json()

    return SearchResponse.parse(data)
  }

  /**
   * Get suggested terms, completions for a query along with some top-ranked results
   *
   * @param params Query to get suggestions for
   * @returns Search suggestions
   */
  async suggest(params: SearchRequest): Promise<SuggestResponse> {
    params = SearchRequest.parse(params)

    const url = this.getUrl('suggest', params)

    const response = await fetch(url)
    const data = await response.json()
    return SuggestResponse.parse(data)
  }

  /**
   * Get the URL for a search request
   *
   * Encodes the search manually as any library to auto-encode the value
   * adds signficant bloat to the package.
   *
   * @param endpoint Search Endpoint to use
   * @param params Search Parameters
   * @returns Search URL Object
   */
  private getUrl(endpoint: string, params: SearchRequest): URL {
    const u = new URL(`/holidays/${endpoint}`, this.host || SEARCH_HOST)

    u.searchParams.set('k', this.searchKey)
    u.searchParams.set('ccy', params.ccy)

    for (const param in params) {
      const v = (params as any)[param] as unknown

      // Handle simple string values
      if (typeof v === 'string') {
        u.searchParams.set(param, v)
        // Handle simple number values
      } else if (typeof v === 'number') {
        u.searchParams.set(param, v.toString())
        // Complex (non-scalar) values
      } else {
        // Simple string arrays
        if (param === 's' || param.match(/^c(\d)$/)) {
          (v as string[]).forEach(s => u.searchParams.append(param + '[]', s))
          // Locations (map of string arrays)
        } else if (param === 'l') {
          // Fields (map of strings)
          const m = v as Record<string, string[]>
          for (const key in m) {
            const vs = m[key]
            vs.forEach(x => u.searchParams.append(`l[${key}][]`, x))
          }
        } else if (param === 'fd' || param === 'fh') {
          const m = v as Record<string, string>
          for (const key in m) {
            u.searchParams.set(`${param}[${key}]`, m[key].toString())
          }
          // Handle dates if a `Date` is passed
        } else if (param === 'df' || param == 'dt') {
          if (typeof v === 'object') {
            const d = (v as Date)
            u.searchParams.set(param, d.toISOString())
          }
        }
      }
    }

    return u
  }
}

/**
 * This constant symbol is used whenever a static reference for the search client
 * is required. Such as an injection key for Vue.
 */
export const SEARCH_CLIENT = Symbol.for('rezkit.tour_search.client')

/**
 * Vue Plugin Module -- Exports some Vue components for building Search UIs
 */
export const vue = (key: string, params?: ClientOptions) => ({
  install(Vue: App) {
    Vue.component('rkts-list-pagination', components.ListPagination)
    Vue.component('rkts-filters-panel', components.FiltersPanel)
    Vue.component('rkts-results-panel', components.ResultsPanel)
    Vue.component('rkts-descriptive-list', components.DescriptiveList)
    Vue.component('rkts-collapsible-list', components.CollapsibleList)
    Vue.component('rkts-list-container', components.ListContainer)
    Vue.component('rkts-list-checkbox', components.ListCheckbox)
    Vue.component('rkts-range-slider', components.RangeSlider)
    Vue.component('rkts-chosen-date', components.ChosenDate)
    Vue.component('rkts-tags-panel', components.TagsPanel)
    Vue.component('rkts-refine-tag', components.RefineTag)
    Vue.component('rkts-results-count', components.ResultsCount)
    Vue.component('rkts-result-card', components.ResultCard)
    Vue.component('rkts-clear-button', components.ClearButton)
    Vue.component('rkts-apply-button', components.ApplyButton)
    Vue.component('rkts-search-box', components.SearchBox)
    Vue.component('rkts-spinner', components.Spinner)
    Vue.component('rkts-sort-by', components.SortBy)
    Vue.provide(SEARCH_CLIENT, new Client(key, params))
  },
})
