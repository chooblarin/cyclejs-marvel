import xs from 'xstream'
import {view} from './view'

export function App(sources) {
  const events$ = sources.DOM.select('.field')
    .events('input')
    .compose(sources.Time.debounce(1000))
  const actions$ = intent(events$)
  const request$ = model(actions$)

  const repos$ = sources.HTTP
    .select('github')
    .flatten()
    .map(res => res.body.items)
    .startWith([])
    .debug(val => {
      console.log(val)
      return val
    })

  return {
    DOM: view(repos$),
    HTTP: request$
  }
}

function intent(events) {
  return events
    .map(ev => ev.target.value)
    .filter(query => 0 < query.length)
}

function model(actions) {
  return actions
    .map(q => ({
      url: `https://api.github.com/search/repositories?q=${encodeURI(q)}`,
      category: 'github'
    }))
}