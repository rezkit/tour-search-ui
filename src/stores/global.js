import { defineStore, createPinia } from 'pinia'
import * as Qs from 'https://cdn.jsdelivr.net/npm/qs@6.11.2/+esm'

const DEFAULT_PAGE_SIZE = 48

function flattenTree(treeData, depth = 0, filters = {}) {
  for (prop in treeData) {
    filters['c' + depth] ??= []

    if (
      typeof treeData[prop] === 'object' &&
      Object.entries(treeData[prop]).length > 0
    ) {
      filters = flattenTree(treeData[prop], depth + 1, filters)
    }
  }

  return filters
}

export const store = createPinia()

export const useSearchStore = defineStore({
  id: 'search',
  state: () => {
    return {
      results: {
        hits: [],
        total: { value: 0 },
      },
      aggregations: {},
      sourceAggregation: {},
      activeSelection: {
        query: '',
        value: '',
        count: 0,
      },
      query: {
        // Currency -- set by the user session
        ccy: 'GBP',

        // Holiday Duration From
        hdf: null,

        // Holiday Duration To
        hdt: null,

        // Dates From
        df: null,

        // Dates To
        dt: null,

        // Fields (Departure)
        fd: {},

        // Fields (Holiday)
        fh: {},

        // Increment (page size)
        i: DEFAULT_PAGE_SIZE,

        // Join mode
        j: 'd',

        // Locations
        l: {},

        // Offset
        o: 0,

        // Price From
        pf: null,

        // Price Increment
        pi: null,

        // Price To
        pt: null,

        // Query
        q: '',

        // Sort
        s: [],

        // Categories
        c0: [],
        c1: [],
        c2: [],
        c3: [],
        c4: [],
      },
      sourceQuery: {
        // Currency -- set by the user session
        ccy: 'GBP',

        // Holiday Duration From
        hdf: null,

        // Holiday Duration To
        hdt: null,

        // Dates From
        df: null,

        // Dates To
        dt: null,

        // Fields (Departure)
        fd: {},

        // Fields (Holiday)
        fh: {},

        // Increment (page size)
        i: DEFAULT_PAGE_SIZE,

        // Join mode
        j: 'd',

        // Locations
        l: {},

        // Offset
        o: 0,

        // Price From
        pf: null,

        // Price Increment
        pi: null,

        // Price To
        pt: null,

        // Query
        q: '',

        // Sort
        s: [],

        // Categories
        c0: [],
        c1: [],
        c2: [],
        c3: [],
        c4: [],
      },
    }
  },
  getters: {
    /**
     *
     * @param {*} state
     * @returns {string[]} selected categories
     */
    selectedCategories(state) {
      const selected = []

      for (let i = 0; i < 10; i++) {
        if (state.query[`c${i}`]?.length > 0) {
          selected.concat(state.query[`c${i}`])
        }
      }

      return selected
    },

    /**
     *
     * @param state
     * @returns { SearchParams } Search Parameters
     */

    sourceParams(state) {
      const query = {
        ...state.sourceQuery,
      }

      // Remove spurious parameters
      delete query.categories

      if (!query.pi > 0) delete query.pi
      if (query.df === null) delete query.df
      if (query.dt === null) delete query.dt
      if (query.pt <= 0) delete query.pt
      if (query.pf <= 0) delete query.pf
      if (query.q?.trim() === '') delete query.q

      return query
    },

    searchParams(state) {
      const query = {
        ...state.query,
      }

      // Remove spurious parameters
      delete query.categories

      if (!query.pi > 0) delete query.pi
      if (query.df === null) delete query.df
      if (query.dt === null) delete query.dt
      if (query.pt <= 0) delete query.pt
      if (query.pf <= 0) delete query.pf
      if (query.q?.trim() === '') delete query.q

      return query
    },

    deepLink(state) {
      const params = {
        ...this.searchParams,
        categories: state.query.categories,
      }
      const u = new URLSearchParams()

      delete params.ccy

      for (const param in params) {
        const v = params[param]

        // handle simple string values
        if (typeof v === 'string') {
          // Skip default param values
          if (param === 'j' && v === 'a') continue

          u.set(param, v)
          // handle simple number values
        } else if (typeof v === 'number') {
          // Skip values if they're still default
          if (param === 'i' && v === DEFAULT_PAGE_SIZE) continue
          if (param === 'o' && v === 0) continue

          u.set(param, v.toString(10))
          // complex (non-scalar) values
        } else {
          // simple string arrays
          if (param === 's' || param.match(/^c(\d)$/)) {
            v.forEach((s) => u.append(param + '[]', s))
            // locations (map of string arrays)
          } else if (param === 'l') {
            // fields (map of strings)
            for (const key in v) {
              const vs = Array.from(v[key])
              vs.forEach((x) => u.append(`l[${key}][]`, x))
            }
          } else if (param === 'df' || param == 'dt') {
            if (typeof v === 'object') {
              u.set(param, v.toISOString())
            }
          }
        }
      }

      return u.toString()
    },
  },

  actions: {
    async setAggregation(client) {
      const { aggregations } = await client.search(this.sourceParams)

      this.sourceAggregation = aggregations
    },
    async search(client) {
      const { hits, aggregations } = await client.search(this.searchParams)

      hits.hits.map((hit, index) => {
        const [_, id] = hit._id.split('-', 2)
        hit._path = ''
        hit._reviews = ''
        hits.hits[index] = hit
      })

      if (this.query.j === 'd') {
        this.$patch({ aggregations })
      }

      this.$patch({ results: hits })
    },

    /**
     *
     * @param {string} params Source params
     */
    loadParams(params) {
      /**
       * @var {Record<string, string | string[]>} query
       */
      const query = Qs.parse(params)

      // Handle date objects
      if (query.hasOwnProperty('df')) {
        const df = Date.parse(query.df)

        if (df > 0) {
          query.df = this.rkGetSameDatetimeInAllTimezones(new Date(query.df))
        }
      }

      if (query.hasOwnProperty('dt')) {
        const dt = Date.parse(query.dt)

        if (dt > 0) {
          query.dt = this.rkGetSameDatetimeInAllTimezones(new Date(query.dt))
        }
      }

      // Numeric properties
      if (query.hasOwnProperty('i')) query.i = parseInt(query.i, 10)
      if (query.hasOwnProperty('o')) query.o = parseInt(query.o, 10)
      if (query.hasOwnProperty('pf')) query.pf = parseFloat(query.pf)
      if (query.hasOwnProperty('pt')) query.pt = parseFloat(query.pt)
      if (query.hasOwnProperty('hdf')) query.hdf = parseInt(query.hdf, 10)
      if (query.hasOwnProperty('hdt')) query.hdt = parseInt(query.hdt, 10)

      this.$patch({ query })
    },
    rkGetSameDatetimeInAllTimezones(date) {
      if (!date) return null
      const timezoneOffset = date.getTimezoneOffset()

      let final

      if (timezoneOffset < 0) {
        final = new Date(date.getTime() - Math.sign(timezoneOffset * 60000))
      } else {
        final = new Date(date.getTime() + Math.sign(timezoneOffset * 60000))
      }
      final.setSeconds(0, 0)
      return final
    },
  },

  persist: false,
})

// q=test&hdf=1&df=2023-12-01&l[Country][]=Morocco&l[Country][]=Tunisia
