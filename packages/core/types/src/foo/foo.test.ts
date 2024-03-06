import expect from 'expect';

import { foo } from './foo';

// NOTE! placeholder test for peace of mind
// to make sure tests are easy to introduce if/when needed
// why? because 2024 and the ts-node / esm / mocha combination is still brittle
// cound't get chai() to work, so using expect.js instead
describe('foo()', () => {
    describe('give input', () => {
        it('returns expected output', () => {
            expect(foo('bar') === 3);
        });
    });
});