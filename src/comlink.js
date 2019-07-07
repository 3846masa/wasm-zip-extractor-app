import * as Comlink from 'comlink';

/**
 * @typedef {Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array} TypedArray
 */

Comlink.transferHandlers.set('TypedArray', {
  canHandle(obj) {
    return [
      Int8Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
    ].some((type) => obj instanceof type);
  },
  /** @param {TypedArray} obj */
  serialize(obj) {
    return [obj, [obj.buffer]];
  },
  /** @param {TypedArray} obj */
  deserialize(obj) {
    return obj;
  },
});

export * from 'comlink';
