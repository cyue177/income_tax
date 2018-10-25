import config from '../common/config/index';
import * as MODELS from '../constants/models';

export default {
  namespace: MODELS.MODEL_SETTINGS,

  state: {
    settings: config.defaultSettings
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
    },
    reset({}, state) {
      return {
        settings: config.defaultSettings
      };
    }
  }
};
