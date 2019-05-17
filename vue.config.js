module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://[::1]:9000'
      }
    }
  }
}
