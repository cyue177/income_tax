import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtAccordion, AtList, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';
import * as MODELS from '../../constants/models';
import './style.scss';

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
        <AtInput
          name='salary'
          title='税前工资：'
          type='number'
          placeholder='请输入税前工资'
          onChange={this.handleChange.bind(this)}
        />
        <AtButton type="primary" onClick={this.handleCalculate}>一键计算</AtButton>
        <View style="height: 5px" />
        <AtAccordion title='个税缴纳' open={true} >
          <AtList hasBorder={false}>
            <AtListItem title='之前的个税' extraText={this.props.incomeTax.old} />
            <AtListItem title='新版的个税' extraText={this.props.incomeTax.new} />
            <AtListItem title='节约的钱' extraText={this.props.incomeTax.saving} />
          </AtList>
        </AtAccordion>
        <View style="height: 5px" />
        <AtAccordion title='五险一金(公司部分)'>
          <AtList hasBorder={false}>
            <AtListItem title='养老保险金(20%)' extraText={this.props.company.endowment} />
            <AtListItem title='医疗保险金(11%)' extraText={this.props.company.medical} />
            <AtListItem title='失业保险金(1.5%)' extraText={this.props.company.unemployment} />
            <AtListItem title='工伤保险金(0.5%)' extraText={this.props.company.employmentInjury} />
            <AtListItem title='生育保险金(1%)' extraText={this.props.company.maternity} />
            <AtListItem title='住房公积金(7%)' extraText={this.props.company.housing} />
            <AtListItem title='补充住房公积金(0%)' extraText={this.props.company.supplementaryHousing} />
          </AtList>
        </AtAccordion>
        <View style="height: 5px" />
        <AtAccordion title='五险一金(个人部分)'>
          <AtList hasBorder={false}>
            <AtListItem title='养老保险金(20%)' extraText={this.props.personal.endowment} />
            <AtListItem title='医疗保险金(11%)' extraText={this.props.personal.medical} />
            <AtListItem title='失业保险金(1.5%)' extraText={this.props.personal.unemployment} />
            <AtListItem title='住房公积金(7%)' extraText={this.props.personal.housing} />
            <AtListItem title='补充住房公积金(0%)' extraText={this.props.personal.supplementaryHousing} />
          </AtList>
        </AtAccordion>
      </View >
    );
  }
}
