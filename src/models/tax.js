import * as MODELS from '../constants/models';

export default {
  namespace: MODELS.MODEL_TAX,

  state: {
    salary: 0,
    incomeTax: {
      old: 0,
      new: 0,
      saving: 0
    },
    personal: {
      endowment: 0,
      medical: 0,
      unemployment: 0,
      housing: 0,
      supplementaryHousing: 0
    },
    company: {
      endowment: 0,
      medical: 0,
      unemployment: 0,
      employmentInjury: 0,
      maternity: 0,
      housing: 0,
      supplementaryHousing: 0
    }
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
