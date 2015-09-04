# `redux-immutablejs`

An alternative to [combineReducers](http://rackt.github.io/redux/docs/api/combineReducers.html) that supports
[ImmutableJs](https://facebook.github.io/immutable-js/).

# Setup

## Initial State

Using `combineReducers` it is possible to provide `createStore` with initial state using Immutable [Iterable](https://facebook.github.io/immutable-js/docs/#/Iterable) type, i.e:

```js
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutablejs';

import Immutable from 'immutable';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const state = Immutable.fromJS({});

const state = reducer(state);
export default createStore(reducer, state);
```

# FAQ

## How this library is different from 'redux-immutable' ?

This library doesn't dictate any specific reducer structure,
While `redux-immutable` focusing on [CRC](https://github.com/gajus/canonical-reducer-composition), while this library
provides some [convertion middlewares](https://github.com/gajus/redux-immutable/issues/3) from FSA to CCA
and vise versa, if you feel like going with _Redux's vanilla_ is the right approach, then consider using our library.
