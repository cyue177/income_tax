import Taro, { Component } from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';

export default class Gitee extends Component {
  config = {
    navigationBarTitleText: '个税小程序'
  };

  render() {
    return (
      <WebView src='https://gitee.com/qinyang_1980/income_tax' />
    )
  }
}
