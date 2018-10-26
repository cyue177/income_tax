import config from '../common/config/index';
import * as MODELS from '../constants/models';
import * as API from './utils/calculate';

export default {
  namespace: MODELS.MODEL_TAX,

  state: config.defaultTaxValues,

  effects: {
  },

  reducers: {
    setDisableCalculate({ payload }, state) {
      return {
        ...state,
        disableCalculate: payload
      }
    },
    setDisableReset({ payload }, state) {
      return {
        ...state,
        disableReset: payload
      }
    },
    setSalary({ payload }, state) {
      return {
        ...state,
        salary: payload
      }
    },
    calculate({ payload }, state) {
      const p = API.calculatePersonal(state.salary, payload);
      const c = API.calculateCompany(state.salary, payload);
      const oldTax = API.calculateIncomeTax(state.salary, config.oldThresholdOfIncomeTax, config.oldIncomeTaxLevels, payload, false);
      const newTax = API.calculateIncomeTax(state.salary, config.newThresholdOfIncomeTax, config.newIncomeTaxLevels, payload, true);
      const cut = API.getExtraCut(payload);

      const afterTax = API.toTwoFixed(state.salary - newTax - p.sum);

      return {
        ...state,
        afterTax,
        personal: p,
        company: c,
        incomeTax: {
          old: oldTax,
          new: newTax,
          cut,
          saving: API.toTwoFixed(oldTax - newTax)
        }
      };
    },
    reset({ }, state) {
      return config.defaultTaxValues;
    }
  }
};
