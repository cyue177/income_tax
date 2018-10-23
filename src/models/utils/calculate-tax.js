import config from '../../common/config/index';

// 保留两位小数
function saveTwo(num) {
  return Math.floor(num * 100) / 100;
}

// 获取社保基数
function getSocialSecurityBase(salary) {
  let base = salary;
  if (salary >= config.maxSocialSecurityBase) {
    base = config.maxSocialSecurityBase;
  } else if (salary <= config.maxSocialSecurityBase) {
    base = config.minSocialSecurityBase;
  }
}

/**
 * 获取扣税档次信息
 * @param {应纳税所得额} income
 */
function getIncomeTaxLevel(income) {
  let findItem = {};
  config.incomeTaxLevels.some((item) => {
    if (income > item.min && income <= item.max) {
      findItem = item;
      return true;
    } else if (item.max === -1 && income > item.min) {
      findItem = item;
      return true;
    } else {
      return false;
    }
  });
  return findItem;
}

/**
 * 计算个人部分
 * @param {税前月薪} salary 
 */
function calculatePersonal(salary) {
  const base = getSocialSecurityBase(salary);
  return {
    endowment: saveTwo(base * 0.08),
    medical: saveTwo(base * 0.02),
    unemployment: saveTwo(base * 0.005),
    housing: saveTwo(base * 0.07),
    supplementaryHousing: 0
  };
}

/**
 * 计算公司部分
 * @param {税前月薪} salary 
 */
function calculateCompany(salary) {
  const base = getSocialSecurityBase(salary);
  return {
    endowment: saveTwo(base * 0.20),
    medical: saveTwo(base * 0.11),
    unemployment: saveTwo(base * 0.015),
    employmentInjury: saveTwo(base * 0.005),
    maternity: saveTwo(base * 0.01),
    housing: saveTwo(base * 0.07),
    supplementaryHousing: 0
  };
}

/**
 * 计算个人所得税
 * 
 * (公式)
 * 应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点
 * 应纳税额 = 应纳税所得额 x 税率 － 速算扣除数
 * 
 * @param {税前月薪} salary 
 * @param {个税起征点} thresholdOfIncomeTax 
 */
function calculateIncomeTax(salary, thresholdOfIncomeTax) {
  const income = salary - calculatePersonal(salary) - thresholdOfIncomeTax;
  const level = getIncomeTaxLevel(income);
  const incomeTax = income * level.rate - level.cut;
  return incomeTax;
}