/** typeof 适用于原始类型类型检查 */

export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

/**
 * Object.prototype.toString.call() 适用于引用类型类型检查
 * 不采用 instanceof，因为 instanceof 会检查原型链，可能会导致误判。
 * 另外，instanceof 在不同环境下可能会导致误判（不同环境下同名对象，非执行同一对象）。
 */

/**
 * 使用 Array.isArray 的根本原因
 *  - iframe、window、worker 等场景下的 Array 不是同一个引用。
 *  - Array.isArray
 */
export const isArray = (value: unknown): value is Array<any> => Array.isArray(value);

const toString = (value: unknown): string => Object.prototype.toString.call(value);

export const isObject = (value: unknown): value is object => toString(value) === '[object Object]';
export const isRegExp = (value: unknown): value is RegExp => toString(value) === '[object RegExp]';
export const isMap = (value: unknown): value is Map<any, any> => toString(value) === '[object Map]';
export const isSet = (value: unknown): value is Set<any> => toString(value) === '[object Set]';
export const isWeakSet = (value: unknown): value is WeakSet<any> =>
  toString(value) === '[object WeakSet]';
export const isWeakMap = (value: unknown): value is WeakMap<any, any> =>
  toString(value) === '[object WeakMap]';
export const isDate = (value: unknown): value is Date => toString(value) === '[object Date]';
export const isDataView = (value: unknown): value is DataView =>
  toString(value) === '[object DataView]';
export const isArrayBuffer = (value: unknown): value is ArrayBuffer =>
  toString(value) === '[object ArrayBuffer]';
export function isTypedArray(
  value: unknown,
): value is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array {
  return (
    toString(value).startsWith('[object ') && toString(value).endsWith('Array]') && !isArray(value)
  );
}

export const isError = (value: unknown): value is Error => toString(value) === '[object Error]';
export const isPromiseLike = <T = unknown>(value: unknown): value is PromiseLike<T> => {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  );
};

// TC39 草案: Observable 通用类型定义
export interface Observer<T> {
  next: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
}

export interface SubscriptionLike {
  unsubscribe(): void;
}

export interface ObservableLike<T> {
  subscribe(observer: Partial<Observer<T>>): SubscriptionLike;
}

export const isObservable = <T = unknown>(value: unknown): value is ObservableLike<T> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as ObservableLike<unknown>).subscribe === 'function';

export const isEmpty = (value: unknown): boolean => {
  /**
   * 排除 undefined 的原因（缺省值）
   *  - 没给: 已声明但未赋值
   *  - 不存在: 对象属性值
   *  - 不知道: 作用域链、原型链中找不到
   */
  if (isNull(value)) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isMap(value) || isSet(value)) return value.size === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

/** 通用工具函数 */
export const getDatatype = (value: unknown): string => {
  if (isNull(value)) return 'Null';
  if (isUndefined(value)) return 'Undefined';
  if (isPromiseLike(value)) return 'Promise';

  return toString(value).slice(8, -1);
};
