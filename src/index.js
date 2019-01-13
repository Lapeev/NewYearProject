import './scss/style.scss';
import * as test from './js/test';
// test.test();
import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
const view = new View();
const model = new Model(view);
new Controller(view, model);