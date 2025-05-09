import { BASE_URL } from '../types/utility-types'
import { GitHubRepo, Item, QueryParams } from '../types/interface'

export async function searchRepo({
  per_page,
  q,
  sort
}: QueryParams): Promise<Item[]> {
  const finalUrl = getQueryParams(`${BASE_URL}/search/repositories`, {
    per_page: String(per_page),
    q,
    sort
  })
  const res = await fetch(finalUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
  })
  if (!res.ok) {
    throw new Error(
      `Connect error: status-${res.status} text-${res.statusText}`
    )
  }

  const data = (await res.json()) as GitHubRepo

  return data.items
}

export function getQueryParams<
  URL extends string,
  O extends { [key: string]: string | undefined }
>(url: URL, params: O): string {
  const configUrl = new URL(url)
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      configUrl.searchParams.append(key, val)
    }
  })

  return configUrl.toString()
}

export const findItem = <T extends { id: number }>(
  items: T[],
  id: number
): T | null => {
  if (!items) return null
  const item = items.find(item => item.id === id)
  return item ?? null
}

export const findDuplicate = <T extends { id: number }>(
  items: T[],
  id: number
): boolean => items.some(item => item.id === id)
