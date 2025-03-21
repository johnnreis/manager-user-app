import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts'

describe('Searchable Repository Unit Tests', () => {
  describe('SearchParams Tests', () => {
    it('page prop', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)

      const params = [
        { page: null as any, expect: 1 },
        { page: undefined, expect: 1 },
        { page: '', expect: 1 },
        { page: 'other string', expect: 1 },
        { page: 0, expect: 1 },
        { page: -1, expect: 1 },
        { page: true, expect: 1 },
        { page: false, expect: 1 },
        { page: {}, expect: 1 },

        { page: 1, expect: 1 },
        { page: 2, expect: 2 },
        { page: 5, expect: 5 },
      ]

      params.forEach(i => {
        const result = new SearchParams({ page: i.page }).page
        expect(result).toBe(i.expect)
      })
    })

    it('perPage prop', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toEqual(15)

      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: 5.5, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: {}, expected: 15 },

        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ]

      params.forEach(i => {
        const result = new SearchParams({ perPage: i.perPage }).perPage
        expect(result).toBe(i.expected)
      })
    })

    it('sort prop', () => {
      const sut = new SearchParams()
      expect(sut.sort).toBeNull()

      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: '' as any, expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 0, expected: '0' },
        { sort: -1, expected: '-1' },
        { sort: 5.5, expected: '5.5' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: '[object Object]' },
        { sort: 1, expected: '1' },
        { sort: 2, expected: '2' },
        { sort: 25, expected: '25' },
      ]

      params.forEach(i => {
        const result = new SearchParams({ sort: i.sort }).sort
        expect(result).toBe(i.expected)
      })
    })

    it('sortDir prop', () => {
      let sut = new SearchParams()
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: null })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: undefined })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: '' })
      expect(sut.sortDir).toBeNull()

      const params = [
        { sortDir: null as any, expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: '' as any, expected: 'desc' },
        { sortDir: 'test', expected: 'desc' },
        { sortDir: 0, expected: 'desc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'desc', expected: 'desc' },
        { sortDir: 'ASC', expected: 'asc' },
        { sortDir: 'DESC', expected: 'desc' },
      ]

      params.forEach(i => {
        expect(
          new SearchParams({ sort: 'field', sortDir: i.sortDir }).sortDir,
        ).toBe(i.expected)
      })
    })

    it('filter prop', () => {
      const sut = new SearchParams()
      expect(sut.filter).toBeNull()

      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: '' as any, expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 0, expected: '0' },
        { filter: -1, expected: '-1' },
        { filter: 5.5, expected: '5.5' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' },
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
        { filter: 25, expected: '25' },
      ]

      params.forEach(i => {
        expect(new SearchParams({ filter: i.filter }).filter).toBe(i.expected)
      })
    })
  })

  describe('SearchResult test', () => {
    it('contructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })
      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'other name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: 'other name',
        sortDir: 'asc',
        filter: 'test',
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'other name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.lastPage).toBe(1)

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'other name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.lastPage).toBe(6)
    })
  })
})
