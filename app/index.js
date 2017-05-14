import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {timeDriver} from '@cycle/time'
import {App} from './app'
import styles from './styles/main.css'

const main = App

const drivers = {
  DOM: makeDOMDriver('body'),
  HTTP: makeHTTPDriver(),
  Time: timeDriver
}

run(main, drivers)
