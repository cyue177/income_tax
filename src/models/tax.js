import config from '../common/config/index';
import * as MODELS from '../constants/models';
import * as API from './utils/calculate-tax';

export default {
  namespace: MODELS.MODEL_TAX,

  state: {
    salary: 0,
    afterTax: 0,
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
      supplementaryHousing: 0,
      sum: 0
    },
    company: {
      endowment: 0,
      medical: 0,
      unemployment: 0,
      employmentInjury: 0,
      maternity: 0,
      housing: 0,
      supplementaryHousing: 0,
      sum: 0
    }
  },

  effects: {
  },

  reducers: {
    setSalary({ payload }, state) {
      return {
        ...state,
        salary: payload
      };
    },
    calculate({ }, state) {
      const p = API.calculatePersonal(state.salary);
      const c = API.calculateCompany(state.salary);
      const oldTax = API.calculateIncomeTax(state.salary, config.oldThresholdOfIncomeTax, config.oldIncomeTaxLevels);
      const newTax = API.calculateIncomeTax(state.salary, config.newThresholdOfIncomeTax, config.newIncomeTaxLevels);

      const afterTax = state.salary - newTax - p.sum;

      return {
        ...state,
        afterTax,
        personal: p,
        company: c,
        incomeTax: {
          old: oldTax,
          new: newTax,
          saving: API.toTwoFixed((oldTax - newTax))
        }
      };
    }
  }
};
