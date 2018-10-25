import * as MODELS from '../constants/models';

export default {
  namespace: MODELS.MODEL_SETTINGS,

  state: {
    settings: {
      housing: 7, // 住房公积金比例（默认为7）

      isExistedSupplementaryHousing: false, // 是否有补充公积金
      supplementaryHousing: 3, // 补充住房公积金比例

      isExistedFirstMortgage: false, // 是否存在首套房贷

      isExistedHouseRent: false, // 是否存在房租
      houseRentIndex: 0, // 租房索引（默认为大型城市）

      isExistedChildrenEducation: false, // 是否有子女
      childrenIndex: 0, // 子女索引（默认为独生子女）

      isExistedElderlyParents: false, // 是否有超过60岁以上的老人
      brothersNumber: 1, // 兄弟姐妹的人数（默认为1，独生子女）

      isExistedContinuingEducation: false, // 是否有继续教育支出
      continuingEducationIndex: 0 // 继续教育索引（默认为学历教育）
    }
  },

  effects: {
  },

  reducers: {
    set({ payload }, state) {
      return {
        settings: {
          ...state.settings,
          [payload.key]: payload.val
        }
      };
    }
  }
};
