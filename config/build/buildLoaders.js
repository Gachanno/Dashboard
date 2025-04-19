// import MiniCssExtractPlugin from "mini-css-extract-plugin";

// export function buildLoaders(options){
//     const isDev = options.mode === 'development'

//     const cssLoaderWithModules = {
//         loader: "css-loader",
//         options: {
//             modules: true,
//         },
//     }
    
//     const scssLoader = {
//         test: /\.(scss|css)$/i,
//         use: [
//             isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
//             cssLoaderWithModules,
//             "sass-loader",
//         ],
//     }
    
//     const tsLoader = {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//     }

//     return [
//         {
//             test: /\.module\.s[ac]ss$/i,
//             use: [ 'style-loader', {
//               loader: 'css-loader',
//               options: { modules: true },
//             }, 'sass-loader' ],
//           },
//         tsLoader
//     ]
// }
export function buildLoaders(options) {
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  };

  const scssModulesLoader = {
    test: /\.module\.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  };

  return [tsLoader, cssLoader, scssModulesLoader, scssLoader];
}
