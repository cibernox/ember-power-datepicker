import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import isDay from './assertions/is-day';
import isDatepicker from './assertions/is-datepicker';

setApplication(Application.create(config.APP));

QUnit.assert.isDay = isDay;
QUnit.assert.isDatepicker = isDatepicker;

setup(QUnit.assert);

start();
