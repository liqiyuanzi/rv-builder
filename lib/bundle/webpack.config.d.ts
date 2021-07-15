declare type Options = {
    entry: string;
    minify: boolean;
    dist: string;
    name: string;
    webpack: Configuration;
};
import { Configuration } from 'webpack';
declare const config: (options: Options) => Configuration;
export default config;
