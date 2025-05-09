import { Item } from './types/interface'

export function createSearchContainer(): HTMLDivElement {
  const root = document.createElement('div')
  root.classList.add('gh-search')

  root.insertAdjacentHTML(
    'afterbegin',
    `
     <div class="gh-search__wrap-input">
       <input
         class="gh-search__input"
         placeholder="Search GitHub repositories..."
         autocomplete="off"
         type="text"
       />
       <button class="gh-search__clean-input">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path d="m3.302 4.717 1.415-1.414 15.98 15.98-1.414 1.414z" />
           <path d="m3.303 19.283 15.98-15.98 1.414 1.414-15.98 15.98z" />
         </svg>
       </button>
     </div>
     `
  )

  return root
}

export function ghDropDownItems(params: Item[], domItems: HTMLElement): void {
  const wrapInput = domItems.querySelector('.gh-search__wrap-input')
  let dropDown = domItems.querySelector(
    '.gh-search__drop-down'
  ) as HTMLUListElement

  if (!params.length && dropDown) {
    dropDown.remove()
    return
  }

  if (!dropDown) {
    dropDown = document.createElement('ul')
    dropDown.classList.add('gh-search__drop-down')
  }

  dropDown.innerHTML = ''

  params.forEach(data => {
    const li = document.createElement('li')
    li.classList.add('gh-search__drop-down-item')
    li.id = String(data.id)
    li.insertAdjacentHTML(
      'beforeend',
      `<button class="gh-search__drop-down-btn" type="button">
      <span class="gh-search__drop-down-name">${data.name}</span> -
      <span class="gh-search__drop-down-login">${data.owner.login}</span>
    </button>`
    )
    dropDown.append(li)
  })

  if (wrapInput) wrapInput.after(dropDown)
}

export function ghAddedItems(params: Item[], domItems: HTMLElement): void {
  let list = domItems.querySelector(
    '.gh-search__list-added'
  ) as HTMLUListElement | null

  if (!params.length && list) {
    list.remove()
    return
  }

  if (!list) {
    list = document.createElement('ul')
    list.classList.add('gh-search__list-added')
  }

  list.innerHTML = ''

  params.forEach(data => {
    const li = document.createElement('li')
    li.classList.add('gh-search__list-added-item')

    li.insertAdjacentHTML(
      'beforeend',
      `<span class="gh-search__repo-name">Name: ${data.name}</span>
         <span class="gh-search__repo-owner">Owner: ${data.owner.login}</span>
         <span class="gh-search__repo-stars">Stars: ${data.stargazers_count}</span>
         <button class="gh-search__remove-item" id="${data.id}">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
             <path d="m3.302 4.717 1.415-1.414 15.98 15.98-1.414 1.414z" />
             <path d="m3.303 19.283 15.98-15.98 1.414 1.414-15.98 15.98z" />
           </svg>
         </button>`
    )
    list.append(li)
  })

  domItems.append(list)
}
