import { z } from 'zod'
import { type App } from 'vue'
import * as components from './components'
export * as Filters from './filters'
import { SearchRequest, SearchResponse } from './search'


export const SEARCH_HOST = 'https://api.tours.rezkit.app'

export type SearchRequest = z.infer<typeof SearchRequest>
export type SearchResponse = z.infer<typeof SearchResponse>

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