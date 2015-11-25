import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  run
} = Ember;

moduleForComponent('debounced-textarea', 'Integration | Component | debounced textarea', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{debounced-textarea}}`);

  assert.equal(this.$().text().trim(), '');
  assert.ok(this.$('textarea'));
});

test('debounced textarea', function(assert) {
  let done = assert.async();
  let done2 = assert.async();

  this.render(hbs`{{debounced-textarea value=value val=debounced wait=500}} rendered: {{debounced}}`);
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
