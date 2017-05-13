import {div, input, hr, ul, li, span} from '@cycle/dom'
import xs from 'xstream';

export function view(state$) {
  const vtree$ = state$
    .map(results =>
      div([
        input('.field', {
          attrs: {
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
  return ul('.search-results', results.map(result =>
    li('.search-result', [
      span(result.name)
    ])
  ))
}
