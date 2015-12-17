# `redux-immutablejs`

Redux & Immutable integration

This is a small library that aims to provide integration tools between [Redux](https://github.com/rackt/redux)
& [ImmutableJs](https://facebook.github.io/immutable-js/) that fully conforms Redux _actions_ & _reducers_ standards.

1. An alternative to [combineReducers](http://rackt.github.io/redux/docs/api/combineReducers.html) that supports
[ImmutableJs](https://facebook.github.io/immutable-js/) for store initial state.
1. An optional handler map reducer creator with immutable support.


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

const store = reducer(state);
export default createStore(reducer, store);
```

## Immutable Handler Map reducer creator

Using `createReducer` is an optional function that creates a reducer from a collection of handlers. In addition to
getting rid of the _switch_ statement, it also provides the following benefits:

1. If the given `initialState` type is mutated, it will get converted to an immutable type.
1. An error is produced in case a reducer handler returns a mutated state (not recommended but this behavior can be disabled)

```js
import { createReducer } from 'redux-immutablejs'
const initialState = Immutable.fromJS({ isAuth: false })

/**
 * Reducer domain that handles authentication & authorization.
 **/
export default createReducer(initialState, {
  [LOGIN]: (state, action) => state.merge({
    isAuth: true,
    token: action.payload.token
  }),

  [LOGOUT]: (domain) => domain.merge({
    isAuth: false,
    current_identity: {},
    token: undefined
  })
})
```

If you want to specify the Immutable type to be used for implicit conversion, pass an constructor function at the end:

```js
export default createReducer([], {
  [ADD_STUFF]: (state, { stuff }) => state.add(stuff)
}, true, ::Immutable.OrderedSet);

```

Please note that this is optional and `combineReducers` should work just fine if you prefer the old `switch` way.


# FAQ

## How this library is different from 'redux-immutable' ?

This library doesn't dictate any specific reducer structure.
While `redux-immutable` focuses on [CRC](https://github.com/gajus/canonical-reducer-composition), this library
provides some [conversion middlewares](https://github.com/gajus/redux-immutable/issues/3) from FSA to CCA
and vise versa. If you feel like going with _Redux's vanilla_ is the right approach, then consider using our library.
