/*
 * @Author: yanfangli
 * @Date:   2017-12-07 18:29:26
 * @Last Modified by:   yanfangli
 * @Last Modified time: 2017-12-07 18:32:37
 */
export default {
  // 设置基础字体大小
  fontSize () {
    window.remFontSize = document.documentElement.clientWidth * 12 / 375;
    document.documentElement.style.fontSize = document.documentElement.clientWidth * 12 / 375 + 'px';
  }
}
