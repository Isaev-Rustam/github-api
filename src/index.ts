import { debounceAsync } from './services/utilities'
import './services/services'
import { findDuplicate, findItem, searchRepo } from './services/services'
import { Item, QueryParams } from './types/interface'
import {
  ghAddedItems,
  ghDropDownItems,
  createSearchContainer
} from './ghDomContent'

let dropDownState: Item[] | null = null
let addItemsState: Item[] = []
const wrapDebounceSearchRepo = debounceAsync(searchRepo)

const root = document.querySelector('#root') as HTMLDivElement
const ghDomContent = createSearchContainer()
const input = ghDomContent.querySelector(
  '.gh-search__input'
) as HTMLInputElement

function inputListener(this: HTMLInputElement): void {
  const queryParams: QueryParams = {
    q: input.value.trim(),
    per_page: 5
  }
  wrapDebounceSearchRepo
    .call(this, queryParams)
    .then(items => {
      dropDownState = items
      ghDropDownItems(dropDownState, ghDomContent)
    })

    .catch(error => {
      console.error('Ошибка поиска:', error)
    })
}

function dropDownListener(e: Event): void {
  const item = e.target as HTMLElement
  const cleanInput = item.closest('.gh-search__clean-input')
  const removeAddedItem = item.closest('.gh-search__remove-item')
  const dropDownItem = item.closest('.gh-search__drop-down-item')

  if (cleanInput) clearDropDown(ghDomContent, input)

  if (dropDownItem && dropDownState) {
    const matchedDropDownItem = findItem(dropDownState, Number(dropDownItem.id))

    if (matchedDropDownItem) {
      if (!findDuplicate(addItemsState, Number(matchedDropDownItem.id))) {
        addItemsState.push(matchedDropDownItem)
      }
    }

    ghAddedItems(addItemsState, ghDomContent)
    clearDropDown(ghDomContent, input)
  }

  if (removeAddedItem) {
    addItemsState = addItemsState.filter(
      item => item.id !== Number(removeAddedItem.id)
    )
    ghAddedItems(addItemsState, ghDomContent)
  }
}

ghDomContent.addEventListener('mouseup', dropDownListener)
input.addEventListener('input', inputListener)
root.append(ghDomContent)

function clearDropDown(domItem: HTMLElement, input: HTMLInputElement): void {
  const dropDownItems = domItem.querySelector('.gh-search__drop-down')
  dropDownState = []
  if (dropDownItems) {
    dropDownItems.remove()
  }
  if (input) {
    input.value = ''
  }
}
