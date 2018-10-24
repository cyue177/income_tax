import Taro, { Component } from '@tarojs/taro';
import { View, Input, Picker } from '@tarojs/components';
import { AtButton, AtInputNumber, AtActionSheet, AtActionSheetItem, AtList, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';
import * as MODELS from '../../constants/models';
import './style.scss';

const settingsDispatcher = dispatcher[MODELS.MODEL_SETTINGS];
@connect(state => ({
  settings: state[MODELS.MODEL_SETTINGS].settings
}))
export default class Settings extends Component {
  config = {
    navigationBarTitleText: '设置'
  };

  constructor(props) {
    super(props);
    const settings = this.props.settings;
    if (settings === undefined) {
      return;
    }

    this.state = {
      ...settings,
      selector: ['独生子女', '二胎家庭'],
    };
  }



  putSettings() {
    let settings = {};
    settingsDispatcher.setSetting(settings);
  }

  // 住房公积金比例
  handleHousingChange(value) {
    this.setState({
      housing: value
    })
  }

  // 补充住房公积金开关
  handleExtraHousingSwitchChange(value) {
    this.setState({
      isExistedExtraHousing: value
    })
  }

  // 补充住房公积金
  handleExtraHousingChange(value) {
    this.setState({
      extraHousing: value
    })
  }

  // 子女个数
  handleChildrenNumberChange(value) {
    this.setState({
      childrenNumber: value
    })
  }

  render() {
    return (
      <View className="index">
        <View >
          <Text>公积金比例(%)</Text>
          <AtInputNumber
            min={5}
            max={7}
            step={1}
            value={this.state.housing}
            onChange={this.handleHousingChange}
          />
        </View>
        <View style="height: 15px" />
        <View>
          <View>
            <Text>是否有补充公积金</Text>
            <Switch checked />
          </View>
          <Text>补充公积金比例(%)</Text>
          <AtInputNumber
            min={1}
            max={5}
            step={1}
            value={this.state.extraHousing}
            onChange={this.handleExtraHousingChange}
          />
        </View>
        <View style="height: 15px" />
        <View >
          <View>
            <Text>是否有子女教育</Text>
            <Switch checked />
          </View>
          <AtList hasBorder={false}>
            <Picker mode='selector' range={this.state.selector} value={selectorValue} onChange={this.handleChange}>
              <AtListItem hasBorder={false} title='子女类型' extraText='dddd' />
            </Picker>
          </AtList>
        </View>
        <View style="height: 15px" />
        <View >
          <View>
            <Text>是否有首套房贷</Text>
            <Switch checked />
          </View>
        </View>
      </View >
    );
  }
}
