import Immutable from 'immutable';

/**
 * Create a handler (action) map reducer for the given list of handlers
 *
 * @param  {object} initialState     The initial state of the reducer, expecting an Immutable.Iterable instance,
 * otherwise given initialState is converted to immutable.
 * @param  {object} handlers         A map of actions where key is action name and value is a reducer function
 * @param  {boolean} enforceImmutable = true if to enforce immutable, in other words a TypeError is thrown in case
 * a handler returned anything that is not an Immutable.Iterable type.
 * @param  {function} constructor    A function to process non-immutable state, defaults to Immutable.fromJS.
 * @return {object}                  The calculated next state
 */
export default function createReducer(initialState, handlers, enforceImmutable = true, constructor = ::Immutable.fromJS) {
  return (state = initialState, action) => {
    // convert the initial state to immutable
    // This is useful in isomorphic apps where states were serialized
    if (!Immutable.Iterable.isIterable(state)) {
      state = constructor(state);
    }

    const handler = (action && action.type) ? handlers[action.type] : undefined;

    if (!handler) {
      return state;
    }

    state = handler(state, action);

    if (enforceImmutable && !Immutable.Iterable.isIterable(state)) {
      throw new TypeError('Reducers must return Immutable objects.');
    }

    return state;
  };
}
