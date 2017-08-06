const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
//静态资源处理
module.exports = 
{
  webpack_assets_file_path: 'webpack/webpack-assets.json',
  webpack_stats_file_path: 'webpack/webpack-stats.json',
  assets:
  {
      images:
    {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    style_modules: {
      extensions: ['scss','css'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          return module.source;
        }
      }
    }
  }
}