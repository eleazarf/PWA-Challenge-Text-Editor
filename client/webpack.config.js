const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// const {GenerateSW} = require('workbox-webpack-plugin');
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',  // Generate an HTML file using this template
        title: 'Just Another Text Editor'  // Set the title of the generated HTML file
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        // TODO: verify sdDest file
        // swDest: 'src-sw.js',
        swDest: 'service-worker.js',
      }),
      
      // new GenerateSW(),  // Set up service worker generation for runtime caching and PWA functionality
      
      new WebpackPwaManifest({
        name: 'PWA Text Editor',   // Define the app's name
        short_name: 'J.A.T.E.',   // Set a short name for the app
        description: 'Just Another Text Editor',  // Provide a description for the app
        background_color: '#ffffff',   // Specify the background color
        start_url: '/',   // Define the start URL of the app
        publicPath: '/',   // Set the public path
        inject: true,
        fingerprints: false,   // Disable fingerprinting
        // publicPath: '.',   // Define the public path
        icons: [
          {
            // src: path.resolve('assets/images/logo.png'),  // Specify the source path for app icons
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Define multiple icon sizes
            destination: path.join('assets', 'icons'),   // Specify the destination path for icons
          }
        ]
      }),
      
      // new InjectManifest({
      //   swSrc: './src-sw.js',   // Define the source for a custom service worker script
      //   // TODO: Verify sdDest file
      //   // swDest: 'src-sw.js',   // Set the destination for the service worker script
      //   swDest: 'service-worker.js',
      // }),      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,  // Test files ending with .css using a case-insensitive regular expression
          use: ['style-loader', 'css-loader'],  // Use style-loader and css-loader for processing CSS files
        },
        {
          test: /\.m?js$/,  // Test files ending with .js or .mjs
          exclude: /node_modules/,  // Exclude files in the node_modules directory from processing
          use: {
            loader: 'babel-loader',  // Use the Babel loader to transpile JavaScript code
            options: {
              presets: ['@babel/preset-env'],  // Specify Babel presets, in this case, preset-env
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Specify Babel plugins
            },
          },
        },        
      ],
    },
  };
};
