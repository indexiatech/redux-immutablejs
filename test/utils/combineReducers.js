import expect from 'expect';
import { combineReducers } from '../../src';
import Immutable, {List, Map} from 'immutable';
const indexedOf = Immutable.Seq.Indexed.of;

describe('Utils', () => {
  const initialState = Map();
  describe('combineReducers', () => {
    const reducer = combineReducers({
      counter: (state = 0, action = {}) =>
        action.type === 'increment' ? state + 1 : state,
      stack: (state = List(), action = {}) =>
        action.type === 'push' ? state.push(action.value) : state
    });
    it('should return a composite reducer that maps the state keys to given reducers', () => {
      const s1 = reducer(initialState, { type: 'increment' });
      expect(Immutable.Map.isMap(s1)).toBe(true);
      expect(s1.get('counter')).toBe(1);
      const s2 = reducer(s1, { type: 'push', value: 'a' });
      expect(Map.isMap(s2)).toBe(true);
      expect(s2.get('counter')).toBe(1);
      expect(List.isList(s2.get('stack'))).toBe(true);
      expect(s2.get('stack').equals(List('a'))).toBe(true);
    });

    it('ignores all props which are not a function', () => {
      const reducer = combineReducers({
        fake: true,
        broken: 'string',
        another: { nested: 'object' },
        stack: (state = Map()) => state
      });

      expect(reducer(initialState, { type: 'push' }).keySeq().equals(indexedOf('stack'))).toBe(true);
    });

    it('returns the initial state when nothing changes', () => {
      const s1 = reducer(initialState, { type: 'increment' });
      const s2 = reducer(s1);
      expect(s1).toBe(s2);
    })

    it('includes alll keys from original state', () => {
      const unexpectedKeys = Map({ unexpected: true });
      const reduced = reducer(unexpectedKeys, { type: 'INIT' });

      expect( reduced.get('unexpected') ).toBe(true);
    });
  });
});
