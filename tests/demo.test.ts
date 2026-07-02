import { expect, test } from 'vite-plus/test';
import { demo_test } from '../src/demo.ts';

test('demo_test', () => {
  expect(demo_test(1, 2)).toBe(3);
});