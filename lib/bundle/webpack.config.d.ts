declare type Options = {
    entry: string;
    minify: boolean;
    dist: string;
    name: string;
};
import { Configuration } from 'webpack';
declare const config: (options: Options) => Configuration;
export default config;
