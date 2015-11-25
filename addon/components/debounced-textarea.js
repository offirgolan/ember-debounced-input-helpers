import Ember from 'ember';
import DebouncedKey from '../mixins/debounced-key';

export default Ember.TextArea.extend(DebouncedKey);
