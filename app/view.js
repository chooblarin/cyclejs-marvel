import {div, input, hr, ul, li, span} from '@cycle/dom'
import styles from './app.css'

export function view(state$) {
  const vtree$ = state$
    .map(results =>
      div(`.main ${styles.mainBody}`,[
        input('.field', {
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
  return ul(`.search-results`, results.map(result =>
    li('.search-result', [
      span(result.name)
    ])
  ))
}
