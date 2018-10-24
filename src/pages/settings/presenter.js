import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtAccordion, AtList, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';
import * as MODELS from '../../constants/models';
import './style.scss';

const taxDispatcher = dispatcher[MODELS.MODEL_TAX];
@connect(state => ({
  salary: state[MODELS.MODEL_TAX].salary,
  afterTax: state[MODELS.MODEL_TAX].afterTax,
  personal: state[MODELS.MODEL_TAX].personal,
  company: state[MODELS.MODEL_TAX].company,
  incomeTax: state[MODELS.MODEL_TAX].incomeTax
}))
export default class Settings extends Component {
  config = {
    navigationBarTitleText: '税扣扣'
  };

  constructor() {
    super(...arguments)
    this.state = {
      buttonDisabled: true
    }
  }

  handleChange(value) {
    taxDispatcher.setSalary(value); // 更新薪水数值
    this.setState({
      buttonDisabled: false
    });
  }

  handleCalculate() {
    taxDispatcher.calculate(); // 计算五险一金和个税
    this.setState({
      buttonDisabled: true
    });
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
        <AtButton type="primary" disabled={this.state.buttonDisabled} onClick={this.handleCalculate}>一键计算</AtButton>
        <View style="height: 5px" />
        <AtAccordion title='个税缴纳' open={true} >
          <AtList hasBorder={false}>
            <AtListItem title='之前的个税' extraText={this.props.incomeTax.old.toString()} />
            <AtListItem title='新版的个税' extraText={this.props.incomeTax.new.toString()} />
            <AtListItem title='节约的钱' extraText={this.props.incomeTax.saving.toString()} />
            <AtListItem title='到手的钱' extraText={this.props.afterTax.toString()} />
          </AtList>
        </AtAccordion>
        <View style="height: 5px" />
        <AtAccordion title='五险一金(公司部分)'>
          <AtList hasBorder={false}>
            <AtListItem title='养老保险金(20%)' extraText={this.props.company.endowment.toString()} />
            <AtListItem title='医疗保险金(11%)' extraText={this.props.company.medical.toString()} />
            <AtListItem title='失业保险金(1.5%)' extraText={this.props.company.unemployment.toString()} />
            <AtListItem title='工伤保险金(0.5%)' extraText={this.props.company.employmentInjury.toString()} />
            <AtListItem title='生育保险金(1%)' extraText={this.props.company.maternity.toString()} />
            <AtListItem title='住房公积金(7%)' extraText={this.props.company.housing.toString()} />
            <AtListItem title='补充住房公积金(0%)' extraText={this.props.company.supplementaryHousing.toString()} />
            <AtListItem title='共计支出(41%)' extraText={this.props.company.sum.toString()} />
          </AtList>
        </AtAccordion>
        <View style="height: 5px" />
        <AtAccordion title='五险一金(个人部分)'>
          <AtList hasBorder={false}>
            <AtListItem title='养老保险金(8%)' extraText={this.props.personal.endowment.toString()} />
            <AtListItem title='医疗保险金(2%)' extraText={this.props.personal.medical.toString()} />
            <AtListItem title='失业保险金(0.5%)' extraText={this.props.personal.unemployment.toString()} />
            <AtListItem title='住房公积金(7%)' extraText={this.props.personal.housing.toString()} />
            <AtListItem title='补充住房公积金(0%)' extraText={this.props.personal.supplementaryHousing.toString()} />
            <AtListItem title='共计支出(17.5%)' extraText={this.props.personal.sum.toString()} />
          </AtList>
        </AtAccordion>
      </View >
    );
  }
}
