module.exports = {
  // 选项...
  // publicPath: '/landingPage/',
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
