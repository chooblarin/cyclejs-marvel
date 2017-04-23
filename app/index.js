import xs from 'xstream';
import {run} from '@cycle/run';
import {div, label, input, hr, h2, makeDOMDriver} from '@cycle/dom';

function intent(DOMSource) {
  const changeWeight$ = DOMSource.select('.weight').events('input')
    .map(ev => ev.target.value);
  const changeHeight$ = DOMSource.select('.height').events('input')
    .map(ev => ev.target.value);
  return {changeWeight$, changeHeight$}
}

function model(changeWeight$, changeHeight$) {
  return xs.combine(
      changeWeight$.startWith(70),
      changeHeight$.startWith(170)
    )
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return {weight, height, bmi}
    });
}

function view(state$) {
  return state$.map(state =>
    div([
      div([
        label(`Weight: ${state.weight}kg`),
        input('.weight', {attrs: {type: 'range', min: 40, max: 150, value: 70}})
      ]),
      div([
        label(`Height: ${state.height}cm`),
        input('.height', {attrs: {type: 'range', min: 140, max: 220, value: 170}})
      ]),
      h2(`BMI is ${state.bmi}`)
    ])
  )
}

function main(sources) {
  const {changeWeight$, changeHeight$} = intent(sources.DOM);
  const state$ = model(changeWeight$, changeHeight$);
  const vtree$ = view(state$);
  const sink = {
    DOM: vtree$
  }
  return sink;
}

const drivers = {
  DOM: makeDOMDriver('body')
}

run(main, drivers)
