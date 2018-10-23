import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import zoro from '@opcjs/zoro';
import tax from './models/tax';
import Index from './pages/index';

const app = zoro();
app.model(tax);

const store = app.start(false); // 启动并创建store, 阻止默认初始化动作

class App extends Component {
  config = {
    pages: [
      'pages/index/presenter'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#39bd8a',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    debug: false
  };

  componentWillMount() {
    app.setup(); // 启动初始化
  }

  render() {
    return <Index />;
  }
}

Taro.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
