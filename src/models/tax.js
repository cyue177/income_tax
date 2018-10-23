import * as MODELS from '../constants/models';

export default {
  namespace: MODELS.MODEL_TAX,

  state: {
    salary: 0
  },

  effects: {
  },

  reducers: {
    setSalary({ payload }, state) {
      console.log(payload);
      return {
        ...state,
        salary: payload
      };
    },
    calculate({ }, state) {
      console.log(payload);
      return {
        ...state
      };
    }
  }
};
