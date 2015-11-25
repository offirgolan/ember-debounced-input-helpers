import Ember from 'ember';
import DebouncedKeyMixin from 'ember-debounced-input-helpers/mixins/debounced-key';
import { module, test } from 'qunit';

module('Unit | Mixin | debounced key');

// Replace this with your real tests.
test('it works', function(assert) {
  let DebouncedKeyObject = Ember.Object.extend(DebouncedKeyMixin);
  let subject = DebouncedKeyObject.create();
  assert.ok(subject);
});
