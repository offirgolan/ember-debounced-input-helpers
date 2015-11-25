import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  run
} = Ember;

moduleForComponent('debounced-input', 'Integration | Component | debounced input', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{debounced-input}}`);

  assert.equal(this.$().text().trim(), '');
  assert.ok(this.$('input'));
});

test('debounced input', function(assert) {
  let done = assert.async();
  let done2 = assert.async();

  this.render(hbs`{{debounced-input value=value val=debounced wait=500}} rendered: {{debounced}}`);
  this.set('value', 'foo');

  run.later(() => {
    assert.equal(this.get('debounced'), undefined);
    done();
  }, 150);

  run.later(() => {
    assert.equal(this.get('debounced'), 'foo');
    assert.equal(this.$().text().trim(), 'rendered: foo');
    done2();
  }, 500);
});

test('debounced input - initial value', function(assert) {
  this.set('debounced', 'foo');
  this.render(hbs`{{debounced-input value=value val=debounced wait=500}} rendered: {{debounced}}`);
  assert.equal(this.$().text().trim(), 'rendered: foo');
});
