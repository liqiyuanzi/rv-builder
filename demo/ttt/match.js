"use strict";
/******************************************************************
 * Copyright (C) 2021 LvChengbin
 *
 * File: simple-search/match.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/29/2021
 * Description:
 ******************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = exports.PUNC_SPLITTED_SLICE_WEIGHT = exports.CHARACTER_WEIGHT = exports.MAX_MATCH_RATING = exports.INCLUDE_RATING = exports.EQUAL_RATING = void 0;
const escape_1 = {};
const punctuations_1 = {};
exports.EQUAL_RATING = 10002;
exports.INCLUDE_RATING = 10001;
exports.MAX_MATCH_RATING = 100;
exports.CHARACTER_WEIGHT = 0.1;
exports.PUNC_SPLITTED_SLICE_WEIGHT = 5;
function match(text, query, options = {}) {
    const { html = true, maxLength = 100, caseSensitive = false, punctuations: puncs = punctuations_1.punctuations } = options;
    const originalText = text;
    const originalQuery = query;
    if (!caseSensitive) {
        text = text.toLowerCase();
        query = query.toLowerCase();
    }
    const result = {
        text: originalText,
        query: originalQuery,
        matches: [originalQuery],
        highlightKeywords: [originalQuery]
    };
    if (query === text) {
        return { ...result, rating: exports.EQUAL_RATING };
    }
    if (text.includes(query)) {
        return { ...result, rating: exports.INCLUDE_RATING };
    }
    query = query.slice(0, maxLength);
    const puncReg = new RegExp([...puncs].filter(x => !!x).map(escape_1.escapeRegExp).join('|') + '|\\s+', 'g');
    /**
     * remove all html tags if options.html is true
     */
    html && (text = text.split(/<[^>]*>/g).join(''));
    const characters = [...new Set(query.replace(puncReg, '').split(''))];
    const matches = [];
    let rating = 0;
    const highlightKeywords = [];
    for (const c of characters) {
        if (text.includes(c)) {
            matches.push(c);
            rating += exports.CHARACTER_WEIGHT;
        }
    }
    highlightKeywords.push(...characters);
    if (rating > exports.CHARACTER_WEIGHT) {
        const slicesCutWithPuncs = query.split(puncReg).filter(x => !!x);
        for (const slice of slicesCutWithPuncs) {
            if (text.includes(slice)) {
                matches.push(slice);
                rating += exports.PUNC_SPLITTED_SLICE_WEIGHT;
            }
        }
    }
    matches.sort((a, b) => a.length < b.length ? 1 : -1);
    highlightKeywords.sort((a, b) => a.length < b.length ? 1 : -1);
    return {
        ...result,
        rating: Math.min(exports.MAX_MATCH_RATING, rating),
        matches,
        highlightKeywords
    };
}
exports.match = match;
