import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';

const taxDispatcher = dispatcher[MODELS.MODEL_TAX];
@connect(state => ({
  salary: state[MODELS.MODEL_TAX].salary
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '个税计算器'
  };

  handleChange(value) {
    taxDispatcher.setSalary(value); // 更新薪水数值
  }

  handleCalculate() {
    taxDispatcher.calculate(); // 计算五险一金和个税
  }

  render() {
    return (
      <View className="index">
        <AtForm>
          <AtInput
            name='salary'
            title='数字'
            type='number'
            placeholder='请输入税前工资'
            value={this.props.salary}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton onClick={this.handleCalculate}>提交</AtButton>
        </AtForm>
      </View>
    );
  }
}
