# Ember Debounced Input Helpers

[![Build Status](https://travis-ci.org/offirgolan/ember-debounced-input-helpers.svg)](https://travis-ci.org/offirgolan/ember-debounced-input-helpers)
[![npm version](https://badge.fury.io/js/ember-debounced-input-helpers.svg)](http://badge.fury.io/js/ember-debounced-input-helpers)
[![Dependency Status](https://david-dm.org/offirgolan/ember-debounced-input-helpers.svg)](https://david-dm.org/offirgolan/ember-debounced-input-helpers)

## Installation ##
```shell
ember install ember-debounced-input-helpers
```

## Looking for help? ##
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-debounced-input-helpers/issues).

## Usage

### Common Options

- `val`: The bound property to be set after the specified key changes
- `wait`: Number of milliseconds to wait. Defaults to 500
- `immediate`: Trigger the function on the leading instead of the trailing edge of the wait interval. Defaults to false.


### debounced-input
Extended from `Ember.TextField` which allows it to take any of the attributes listed [here](http://guides.emberjs.com/v1.10.0/templates/input-helpers/#toc_text-fields)

```hbs
{{debounced-input val=val wait=500 immediate=false}}
```

### debounced-textarea
Extended from `Ember.TextArea` which allows it to take any of the attributes listed [here](http://guides.emberjs.com/v1.10.0/templates/input-helpers/#toc_text-areas)

```hbs
{{debounced-textarea val=val wait=500 immediate=false}}
```

### debounced-value
There are many times where you might have your own input component or you're using a 3rd party addon that needs to be debounced.

```hbs
{{#debounced-value val=date wait=500 immediate=false as |value|}}
  {{date-picker startDate=value}}
{{/debounced-value}}
```

The `debounced-value` component yields the raw value which you can place anywhere in the block.
