import * as Comlink from 'comlinkjs';

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
  serialize(obj) {
    return { buffer: obj.buffer, type: obj.constructor.name };
  },
  deserialize(obj) {
    return new self[obj.type](obj.buffer);
  },
});

export * from 'comlinkjs';
