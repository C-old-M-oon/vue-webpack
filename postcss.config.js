/* 
* @Author: leeZ
* @Date:   2018-03-29 14:56:22
* @Last Modified by:   leeZ
* @Last Modified time: 2018-03-29 14:59:18
*/
// 优化css代码：如浏览器前缀兼容问题
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}