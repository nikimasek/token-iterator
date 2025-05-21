import { createTokenIterator, Token } from "../src";
import assert from 'node:assert';
import { describe, test } from 'node:test';

console.log('Running tests...');
describe('createTokenIterator', () => {
  test('should iterate over words by default', () => {
    const text = 'Hello world!';
    const iter = createTokenIterator(/\w+/g, text);
    const tokens: Token[] = [];
    while (iter.hasNext()) {
      tokens.push(iter.next());
    }
    assert.deepStrictEqual(tokens, ['Hello', 'world']);
  });

  test('should use a custom regex pattern', () => {
    const text = 'a, b; c';
    const iter = createTokenIterator(/\w/g, text);
    const tokens: Token[] = [];
    while (iter.hasNext()) {
      tokens.push(iter.next());
    }
    assert.deepStrictEqual(tokens, ['a', 'b', 'c']);
  });

  test('should return false for hasNext() when done', () => {
    const iter = createTokenIterator(/\w+/g, 'one');
    iter.next();
    assert.strictEqual(iter.hasNext(), false);
  });

  test('should throw if next() called when done', () => {
    const iter = createTokenIterator(/\w+/g, '');
    assert.throws(() => iter.next());
  });
});
