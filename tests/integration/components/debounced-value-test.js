import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  run
} = Ember;

moduleForComponent('debounced-value', 'Integration | Component | debounced value', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{debounced-value}}`);

  assert.equal(this.$().text().trim(), '');
});

test('debounced value', function(assert) {
  let done = assert.async();
  let done2 = assert.async();

  this.render(hbs`
    {{#debounced-value value=value val=debounced as |value|}}
      {{input value=value}} rendered: {{debounced}}
    {{/debounced-value}}
  `);

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
