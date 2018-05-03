var fs = require('fs');

// var headJavascript = fs.readFileSync('./src/static/hotcss/hotcss.js',{encoding:'utf8'});

var headJavascript = 'dddddddd';


headJavascript = '<script>' + headJavascript + '</script>';

console.log(headJavascript)

function HeadJavascriptInjectPlugin(options) {
  // Configure your plugin with options...
}

HeadJavascriptInjectPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      var html = htmlPluginData.html
      html = html.replace('{{{__HEAD_JAVASCRIPT__}}}', headJavascript)
      htmlPluginData.html = html
      callback(null, htmlPluginData)
    })
  })
}

module.exports = HeadJavascriptInjectPlugin
