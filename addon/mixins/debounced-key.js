import Ember from 'ember';

const {
  run,
  addObserver,
  removeObserver
} = Ember;

export default Ember.Mixin.create({
  /**
   * Number of milliseconds to wait.
   * @type {Number}
   */
  wait: 500,
  /**
   * Trigger the function on the leading instead of the trailing edge of the wait interval. Defaults to false.
   * @type {Boolean}
   */
  immediate: false,

  /**
   * Bound property to be set after the specified key changes
   * @type {String}
   */
  val: null,

  /**
   * The key to observe
   * @type {String}
   */
  _key: 'value',

  init() {
    this._super(...arguments);

    // Handle initial value
    this.set('value', this.get('val'));
    addObserver(this, this._key, this, this._keyChanged);
  },

  _keyChanged() {
    this._pid = run.debounce(this, this._setKey, this.wait, this.immediate);
  },

  _setKey() {
    if(!this.isDestroying && !this.isDestroyed) {
      this.set('val', this.get(this._key));
    }
  },

  /**
   * Cleanup by canceling any current debounce and removing the observer
   */
  willDestroy() {
    this._super(...arguments);
    run.cancel(this._pid);
    removeObserver(this, this._key, this, this._keyChanged);
  }
});
