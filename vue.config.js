module.exports = {
  // 选项...
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '打算多久开荤?';
      return args;
    });
  },
  publicPath: '/landingPage/',
  devServer: {
    proxy: {
      '/1.1': {
        target: 'https://wahhh1kd.lc-cn-n1-shared.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
