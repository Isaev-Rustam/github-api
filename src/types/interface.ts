import { NumRange } from './utility-types'

export interface QueryParams {
  sort?: 'stars' | 'forks' | 'updated' | 'help-wanted-issues'
  per_page: NumRange<101>
  q: string
}

export interface GitHubRepo {
  items: Item[]
}

export interface Item {
  id: number
  name: string
  stargazers_count: number
  owner: Owner
}

export interface Owner {
  login: string
}
