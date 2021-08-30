/******************************************************************
 * Copyright (C) 2021 LvChengbin
 *
 * File: request/response.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/18/2021
 * Description:
 ******************************************************************/

import { CancelTokenSource, AxiosResponse } from 'axios';

interface ResponseOptions<T> {
    promise: Promise<AxiosResponse<T>>;
    cancelTokenSource: CancelTokenSource;
}

/**
 * Encapsulate an enhanced response instead using native promise
 * The Response should be a `Promise` object and must support all features of native Promise, includes methods in Promise.prototype and async/await function.
 */
export class Response<T> {

    #promise: Promise<AxiosResponse<T>>;

    /**
     * The `CancelTokenSource` of axios for being used to abort the request
     * https://github.com/axios/axios#cancellation
     */
    #cancelTokenSource: CancelTokenSource;

    constructor( options: ResponseOptions<T> ) {
        this.#promise = options.promise;
        this.#cancelTokenSource = options.cancelTokenSource;
    }

    /**
     * Cancel the request
     * @param message - the message will be passed to `source.cancel` function of axios;
     */
    abort( message?: string ): void {
        this.#cancelTokenSource.cancel( message );
    }

    /**
     * Delegate the native `then` method in #promise
     */
    async then( ...args: Parameters<Promise<unknown>[ 'then' ]> ): Promise<unknown> {
        return this.#promise.then( ...args );
    }

    /**
     * Delegate the native `catch` method in #promise
     */
    async catch( ...args: Parameters<Promise<unknown>[ 'catch' ]> ): Promise<unknown> {
        return this.#promise.catch( ...args );
    }

    /**
     * Delegate the native `finally` method in #promise
     */
    async finally( ...args: Parameters<Promise<unknown>[ 'finally' ]> ): Promise<AxiosResponse<T>> {
        return this.#promise.finally( ...args );
    }
}
