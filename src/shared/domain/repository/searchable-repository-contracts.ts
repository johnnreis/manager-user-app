import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contract'

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string
  protected _sortDir: SortDirection
  protected _filter: string

  constructor(props: SearchProps) {
    this._page = props.page
    this._perPage = props.perPage
    this._sort = props.sort
    this._sortDir = props.sortDir
    this._filter = props.filter
  }

  get page() {
    return this._page
  }

  private set page(value: number) {}

  get perPage() {
    return this.perPage
  }

  private set perPage(value: number) {}

  get sort() {
    return this._sort
  }

  private set sort(value: string) {}

  get sortDir() {
    return this._sortDir
  }

  private set sortDir(value: string) {}

  get filter() {
    return this._filter
  }

  private set filter(value: string) {}
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>
}
