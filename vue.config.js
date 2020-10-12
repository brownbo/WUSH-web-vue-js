module.exports = {
  // 选项...
  publicPath: '/WUSH-web-vue-js/',
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
