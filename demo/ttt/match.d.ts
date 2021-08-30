/******************************************************************
 * Copyright (C) 2021 LvChengbin
 *
 * File: simple-search/match.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/29/2021
 * Description:
 ******************************************************************/
export declare const EQUAL_RATING = 10002;
export declare const INCLUDE_RATING = 10001;
export declare const MAX_MATCH_RATING = 100;
export declare const CHARACTER_WEIGHT = 0.1;
export declare const PUNC_SPLITTED_SLICE_WEIGHT = 5;
export interface MatchOptions {
    html?: boolean;
    maxLength?: number;
    caseSensitive?: boolean;
    punctuations?: Set<string>;
}
export interface MatchResult {
    text: string;
    query: string;
    rating: number;
    matches: string[];
    highlightKeywords: string[];
}
export declare function match(text: string, query: string, options?: MatchOptions): MatchResult;
