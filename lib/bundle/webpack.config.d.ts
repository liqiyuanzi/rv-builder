import { Configuration } from 'webpack';
declare type Options = {
    entry: string;
    minify: boolean;
    dist: string;
    name: string;
    webpack: Configuration;
};
declare const config: (options: Options) => Configuration;
export default config;
