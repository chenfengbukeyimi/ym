import { describe, expect, test } from 'vite-plus/test';
import {
  getDatatype,
  isNull,
  isUndefined,
  isBoolean,
  isString,
  isSymbol,
  isNumber,
  isBigInt,
  isFunction,
  isArray,
  isArrayBuffer,
  isTypedArray,
  isError,
  isPromiseLike,
  isObservable,
  isEmpty,
} from '../../../src/index.ts';

describe('datatype test', () => {
  test('test is* function', () => {
    expect(isNull(null)).toBe(true);
    expect(isUndefined(undefined)).toBe(true);

    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);

    expect(isString('')).toBe(true);
    expect(isSymbol(Symbol('hello'))).toBe(true);
    expect(isNumber(123)).toBe(true);
    expect(isBigInt(123n)).toBe(true);
    expect(isFunction(() => {})).toBe(true);

    expect(isArray([])).toBe(true);
    expect(isArray(Array.from([1, 2, 3]))).toBe(true);

    expect(isArrayBuffer(new ArrayBuffer())).toBe(true);

    expect(isTypedArray(new Int8Array())).toBe(true);
    expect(isTypedArray(new Uint8Array())).toBe(true);
    expect(isTypedArray(new Uint8ClampedArray())).toBe(true);
    expect(isTypedArray(new Int16Array())).toBe(true);
    expect(isTypedArray(new Uint16Array())).toBe(true);
    expect(isTypedArray(new Int32Array())).toBe(true);
    expect(isTypedArray(new Uint32Array())).toBe(true);
    expect(isTypedArray(new Float32Array())).toBe(true);
    expect(isTypedArray(new Float64Array())).toBe(true);

    expect(isError(new Error())).toBe(true);
    expect(isPromiseLike(new Promise(() => {}))).toBe(true);

    expect(isObservable({ subscribe: () => {} })).toBe(true);

    expect(isEmpty(undefined)).toBe(false);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  test('test getDatatype function', () => {
    expect(getDatatype(null)).toBe('Null');
    expect(getDatatype(undefined)).toBe('Undefined');
    expect(getDatatype(true)).toBe('Boolean');
    expect(getDatatype(false)).toBe('Boolean');
    expect(getDatatype('hello')).toBe('String');
    expect(getDatatype(Symbol('hello'))).toBe('Symbol');
    expect(getDatatype(123)).toBe('Number');
    expect(getDatatype(123.456)).toBe('Number');
    expect(getDatatype(123n)).toBe('BigInt');

    expect(getDatatype({})).toBe('Object');
    expect(getDatatype([])).toBe('Array');
    expect(getDatatype(() => {})).toBe('Function');
    expect(getDatatype(new Date())).toBe('Date');
    expect(getDatatype(new RegExp('hello'))).toBe('RegExp');
    expect(getDatatype(new Map())).toBe('Map');
    expect(getDatatype(new Set())).toBe('Set');
    expect(getDatatype(new WeakSet())).toBe('WeakSet');
    expect(getDatatype(new WeakMap())).toBe('WeakMap');
    expect(getDatatype(new ArrayBuffer())).toBe('ArrayBuffer');

    expect(getDatatype(new Int8Array())).toBe('Int8Array');
    expect(getDatatype(new Uint8Array())).toBe('Uint8Array');
    expect(getDatatype(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
    expect(getDatatype(new Int16Array())).toBe('Int16Array');
    expect(getDatatype(new Uint16Array())).toBe('Uint16Array');
    expect(getDatatype(new Int32Array())).toBe('Int32Array');
    expect(getDatatype(new Uint32Array())).toBe('Uint32Array');
    expect(getDatatype(new Float32Array())).toBe('Float32Array');
    expect(getDatatype(new Float64Array())).toBe('Float64Array');
    expect(getDatatype(new Uint8Array())).toBe('Uint8Array');

    expect(getDatatype(new Error())).toBe('Error');
    expect(getDatatype(new Promise(() => {}))).toBe('Promise');
  });
});
