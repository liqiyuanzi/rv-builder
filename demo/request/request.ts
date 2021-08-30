/******************************************************************
 * Copyright (C) 2021 LvChengbin
 *
 * File: request/request.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/18/2021
 * Description:
 ******************************************************************/

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from './response';
// import { LocalCacheOptions } from '../local-cache';

export type RequestOptions =
    & AxiosRequestConfig
    & {
        // localCache: LocalCacheOptions;
        instance?: AxiosInstance;
    };

type RequestMethodWithPayload =
    | 'post'
    | 'put'
    | 'patch';

type RequestMethodWithoutPayload =
    | 'get'
    | 'delete'
    | 'head'
    | 'options';

type Payload = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type RequestMethod = RequestMethodWithPayload | RequestMethodWithoutPayload;

const requestMethodWithPayload = [ 'post', 'put', 'patch' ];

export class Request {


    static isCancel( value: unknown ): boolean {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return axios.isCancel( value as any );
    }

    #options: RequestOptions;

    public instance: AxiosInstance;

    constructor( options: RequestOptions = {} ) {
        this.#options = options;
        this.instance = options.instance ?? axios.create( options );
    }

    /**
     * Send request for methods with payload, includes `post`, `put`, `patch`.
     *
     * @param method - request method
     * @param url - request url
     * @param data - payload data
     * @param options - request options
     *
     * @returns - the Response instance
     */
    #request<T = unknown, R = AxiosResponse<T>>(
        method: RequestMethodWithPayload,
        url: string | URL,
        data?: Payload,
        options?: RequestOptions
    ): Response<R>;

    /**
     * Send request without payload
     *
     * @param method - request method
     * @param url - request url
     * @param options - request options
     *
     * @returns - the Response instance
     */
    #request<T = unknown, R = AxiosResponse<T>>(
        method: RequestMethodWithoutPayload,
        url: string | URL,
        options?: RequestOptions
    ): Response<R>;

    #request<T = unknown, R = AxiosResponse<T>>( method: RequestMethod, url: string | URL, data?: Payload, options?: RequestOptions ): Response<R> {

        let promise: Promise<AxiosResponse<R>>;

        if( typeof url !== 'string' ) url = url.href;

        if( !requestMethodWithPayload.includes( method ) ) {
            options = data as RequestOptions;
        }

        const cancelTokenSource = axios.CancelToken.source();
        options = {
            cancelToken : cancelTokenSource.token,
            ...options
        };

        if( requestMethodWithPayload.includes( method ) ) {
            promise = this.instance[ method ]( url as string, data, options );
        } else {
            promise = this.instance[ method ]( url as string, options );
        }

        return new Response( {
            promise,
            cancelTokenSource
        } );
    }

    get<T = unknown, R = AxiosResponse<T>>( url: string | URL, options: RequestOptions = {} ): Response<R> {
        return this.#request( 'get', url, options );
    }

    options<T = unknown, R = AxiosResponse<T>>( url: string, options?: RequestOptions ): Response<R> {
        return this.#request( 'options', url, options );
    }

    delete<T = unknown, R = AxiosResponse<T>>( url: string, options?: RequestOptions ): Response<R> {
        return this.#request( 'delete', url, options );
    }

    head<T = unknown, R = AxiosResponse<T>>( url: string, options?: RequestOptions ): Response<R> {
        return this.#request( 'head', url, options );
    }

    post<T = unknown, R = AxiosResponse<T>>( url: string | URL, ...args: [ Payload, RequestOptions ] ): Response<R> {
        return this.#request( 'post', url, ...args );
    }

    put<T = unknown, R = AxiosResponse<T>>( url: string, ...args: [ Payload, RequestOptions ] ): Response<R> {
        return this.#request( 'put', url, ...args );
    }

    patch<T = unknown, R = AxiosResponse<T>>( url: string, ...args: [ Payload, RequestOptions ] ): Response<R> {
        return this.#request( 'patch', url, ...args );
    }
}
