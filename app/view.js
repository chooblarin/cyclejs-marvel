import {div, input, hr, ul, li, span, img} from '@cycle/dom'
import styles from './styles/app.css'
import logo from './images/logo-header-marvel.png'

export function view(state$) {
  const vtree$ = state$
    .map(results =>
      div(`.main ${styles.mainBody}`,[
        img(`.logo ${styles.logo}`, {
          attrs: {
            src: logo
          }
        }),
        input(`.field ${styles.searchField}`, {
          attrs: {
            placeholder: 'Search characters',
            type: 'text'
          }
        }),
        hr(),
        renderSearchResults(results)
      ])
    )
  return vtree$
}

function renderSearchResults(results) {
  return ul(`.search-results ${styles.searchResults}`, results.map(result =>
    li('.search-result', [
      span(result.name)
    ])
  ))
}
