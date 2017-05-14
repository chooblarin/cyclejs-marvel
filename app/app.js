import xs from 'xstream'
import {view} from './view'
import {config} from './config'

export function App(sources) {
  const searchQuery$ = sources.DOM.select('.field').events('input')
    .compose(sources.Time.debounce(1000))
    .map(ev => ev.target.value)
    .filter(query => 0 < query.length)

  const request$ = searchQuery$
    .map(q => ({
      url: `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${q}&limit=10&apikey=${config.API_KEY}`,
      category: 'marvel'
    }))

  const repos$ = sources.HTTP
    .select('marvel')
    .flatten()
    .map(res => res.body.data.results)
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
