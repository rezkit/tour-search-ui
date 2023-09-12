import { ZodError } from 'zod'
import { Client, SearchRequest } from './main'

describe('Client', () => {
    test('constructor', () => {
        const c = new Client('mock')
        expect(c).not.toBeNull()
    })

    describe('search', () => {
        const client = new Client('mock')
        
        describe('throws an error with invalid parameters', () => {
            test('when `ccy` is missing', async () => {
                const params = {}

                await expect(client.search(params as SearchRequest)).rejects.toThrow(ZodError)
            })

            test('when `q` and `qs` are both specified', async () => {
                const params = { ccy: 'AAA', q: 'test', qs: 'test' }

                await expect(client.search(params)).rejects.toThrow(ZodError)
            })
        })
    })

})