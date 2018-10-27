import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtInput, AtButton, AtAccordion, AtList, AtListItem, AtNoticebar } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';
import config from '../../common/config/index';
import * as MODELS from '../../constants/models';
import './style.scss';

const taxDispatcher = dispatcher[MODELS.MODEL_TAX];
@connect(state => ({
  salary: state[MODELS.MODEL_TAX].salary,
  disableCalculate: state[MODELS.MODEL_TAX].disableCalculate,
  afterTax: state[MODELS.MODEL_TAX].afterTax,
  personal: state[MODELS.MODEL_TAX].personal,
  company: state[MODELS.MODEL_TAX].company,
  incomeTax: state[MODELS.MODEL_TAX].incomeTax,
  settings: state[MODELS.MODEL_SETTINGS].settings
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '税扣扣 2.2.0'
  };

  handleChangeSalary(value) {
    taxDispatcher.setSalary(value); // 更新薪水数值

    // 点击clear按钮后,value为空字符,这里需要reset
    if (value === '') {
      taxDispatcher.reset();
    } else {
      taxDispatcher.setDisableCalculate(false);
    }
  }

  handleCalculate() {
    taxDispatcher.calculate(this.props.settings); // 计算五险一金和个税
    taxDispatcher.setDisableCalculate(true);
  }

  gotoSettings() {
    Taro.navigateTo({
      url: '/pages/settings/presenter'
    });
  }

  handleReward() {
    Taro.previewImage({
      urls: [config.rewardPicAddress] // 需要预览的图片https链接列表
    });
  }

  render() {
    const supplementaryHousing = this.props.settings.isExistedSupplementaryHousing ? this.props.settings.supplementaryHousing : 0;
    return (
      <View className="index">
        <AtInput
          name='salary'
          title='税前工资：'
          type='number'
          clear={true}
          value={this.props.salary === 0 ? '' : this.props.salary}
          placeholder='请输入税前工资'
          onChange={this.handleChangeSalary.bind(this)}
        />
        <View className='at-row'>
          <View className='at-col at-col-8'>
            <AtButton type="primary" disabled={this.props.disableCalculate} onClick={this.handleCalculate}>一键计算</AtButton>
          </View>
          <View className='at-col at-col-4'>
            <AtButton type="primary" onClick={this.gotoSettings}>设置</AtButton>
          </View>
        </View>
        <View style="height: 5px" />
        <AtAccordion title='个税缴纳' open={true} >
          <AtList hasBorder={false}>
            <AtListItem title='之前的个税' extraText={this.props.incomeTax.old.toString()} />
            <AtListItem title='新版的个税' extraText={this.props.incomeTax.new.toString()} />
            <AtListItem title='节约的钱' extraText={this.props.incomeTax.saving.toString()} />
            <AtListItem title='专项附加扣除' extraText={this.props.incomeTax.cut.toString()} />
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
            <AtListItem
              title={`住房公积金(${this.props.settings.housing}%)`}
              extraText={this.props.company.housing.toString()}
            />
            <AtListItem
              title={`补充住房公积金(${supplementaryHousing}%)`}
              extraText={this.props.company.supplementaryHousing.toString()}
            />
            <AtListItem
              title={`共计支出(${34 + this.props.settings.housing + supplementaryHousing}%)`}
              extraText={this.props.company.sum.toString()}
            />
          </AtList>
        </AtAccordion>
        <View style="height: 5px" />
        <AtAccordion title='五险一金(个人部分)'>
          <AtList hasBorder={false}>
            <AtListItem title='养老保险金(8%)' extraText={this.props.personal.endowment.toString()} />
            <AtListItem title='医疗保险金(2%)' extraText={this.props.personal.medical.toString()} />
            <AtListItem title='失业保险金(0.5%)' extraText={this.props.personal.unemployment.toString()} />
            <AtListItem
              title={`住房公积金(${this.props.settings.housing}%)`}
              extraText={this.props.personal.housing.toString()}
            />
            <AtListItem
              title={`补充住房公积金(${supplementaryHousing}%)`}
              extraText={this.props.personal.supplementaryHousing.toString()}
            />
            <AtListItem
              title={`共计支出(${10.5 + this.props.settings.housing + supplementaryHousing}%)`}
              extraText={this.props.personal.sum.toString()}
            />
          </AtList>
        </AtAccordion>
        <AtNoticebar icon='volume-plus'>
          {config.notice}
        </AtNoticebar>
        <AtNoticebar>
          {config.copyright}
        </AtNoticebar>
        <View className='reward-view'>
          <AtButton type='secondary' size="small" onClick={this.handleReward}>打赏</AtButton>
        </View>
      </View >
    );
  }
}
