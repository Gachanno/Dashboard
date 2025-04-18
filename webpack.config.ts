import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Mode = 'development' | 'production'

interface EnvVariables {
    mode: Mode;
    port: number;
}


export default (env: EnvVariables) =>{
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            new webpack.ProgressPlugin()
        ],
        module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: {
            port: env.port ?? 3000,
            static: './build',
        },
        devtool: 'inline-source-map',
    }
    return config
}
