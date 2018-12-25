// https://github.com/GoogleChromeLabs/comlink/blob/v3.1.1/comlink.ts#L28-L47
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

type Promisify<T> = T extends Promise<any> ? T : Promise<T>;

type ProxiedObject<T> = { [P in keyof T]: ProxyResult<T[P]> };

type ProxyResult<T> = (T extends Record<any, any> ? ProxiedObject<T> : Promisify<T>) &
  (T extends (...args: infer Arguments) => infer R ? (...args: Arguments) => Promisify<R> : unknown) &
  (T extends { new (...args: infer ArgumentsType): infer InstanceType }
    ? { new (...args: ArgumentsType): Promisify<ProxiedObject<InstanceType>> }
    : unknown);
