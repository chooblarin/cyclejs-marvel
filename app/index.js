import xs from 'xstream';
import {run} from '@cycle/run';
import {div, span, label, input, hr, h2, makeDOMDriver} from '@cycle/dom';
import LabeledSlider from './LabeledSlider';

function model(weightSliderValue$, heightSliderValue$) {
  return xs.combine(weightSliderValue$, heightSliderValue$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return bmi;
    });
}

function view(bmi$, weightSliderDOM, heightSliderDOM) {
  return xs.combine(bmi$, weightSliderDOM, heightSliderDOM)
    .map(([bmi, weightVTree, heightVTree]) => 
      div([
        weightVTree,
        heightVTree,
        h2(`BMI is ${bmi}`)
      ])
    );
}

function main(sources) {
  const weightProps$ = xs.of({
    label: 'Weight', unit: 'kg', min: 40, max: 150, init: 70
  });
  const heightProps$ = xs.of({
    label: 'Height', unit: 'cm', min: 140, max: 220, init: 170
  });

  const weightSlider = LabeledSlider({DOM: sources.DOM, props$: weightProps$});
  const heightSlider = LabeledSlider({DOM: sources.DOM, props$: heightProps$});

  const bmi$ = model(weightSlider.value, heightSlider.value);
  const vtree$ = view(bmi$, weightSlider.DOM, heightSlider.DOM);

  return {
    DOM: vtree$
  };
}

const drivers = {
  DOM: makeDOMDriver('body')
}

run(main, drivers)
