module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? 'dist/prod' : 'dist/dev',
  publicPath: '/',
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = 'Kaptilo';
          return args;
        });
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_BASE_API_URL,
        changeOrigin: true,
        secure:false,
        pathRewrite: {'^/api': '/api'},
        logLevel: 'debug'
      }
    }
  }
}
