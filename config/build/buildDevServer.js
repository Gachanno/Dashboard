

export function buildDevServer({port}){
    return {
        port: port ?? 3000,
        static: './build',
        historyApiFallback: true,
        hot: true
    }
}