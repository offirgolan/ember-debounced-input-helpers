import Ember from 'ember';

const {
  run,
  isEqual,
  observer,
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
   * Usually debounced properties are one way, if you plan to manually update val, this will keep val and value in sync
   * @type {Boolean}
   */
  sync: false,

  /**
   * Bound value to be debounced
   */
  val: null,

  /**
   * Raw value
   */
  value: null,

  init() {
    this._super(...arguments);
    this.set('value', this.get('val'));
    if(this.sync) {
      addObserver(this, 'val', this, this._sync);
    }
  },

  onValueChange: observer('value', function() {
    this._valuePid = run.debounce(this, this._setVal, this.wait, this.immediate);
  }),

  _sync() {
    if(!this.isDestroying && !this.isDestroyed && !isEqual(this.get('val'), this.get('value'))) {
      this.set('value', this.get('val'));
    }
  },

  _setVal() {
    if(!this.isDestroying && !this.isDestroyed) {
      this.set('val', this.get('value'));
    }
  },

  /**
   * Cleanup by canceling any current debounce
   */
  willDestroy() {
    this._super(...arguments);
    run.cancel(this._valuePid);
    if(this.sync) {
      removeObserver(this, 'val', this, this._sync);
    }
  }
});
