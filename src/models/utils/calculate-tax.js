import config from '../../common/config/index';

// 保留两位小数
export function toTwoFixed(num) {
  return parseFloat(num.toFixed(2));
}

// 获取社保基数
function getSocialSecurityBase(salary) {
  let base = salary;
  if (salary >= config.maxSocialSecurityBase) {
    base = config.maxSocialSecurityBase;
  } else if (salary <= config.maxSocialSecurityBase) {
    base = config.minSocialSecurityBase;
  }
  return base;
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
export function calculatePersonal(salary) {
  const base = getSocialSecurityBase(salary);
  return {
    endowment: toTwoFixed(base * 0.08),
    medical: toTwoFixed(base * 0.02),
    unemployment: toTwoFixed(base * 0.005),
    housing: toTwoFixed(base * 0.07),
    supplementaryHousing: toTwoFixed(0)
  };
}

/**
 * 计算公司部分
 * @param {税前月薪} salary 
 */
export function calculateCompany(salary) {
  const base = getSocialSecurityBase(salary);
  return {
    endowment: toTwoFixed(base * 0.20),
    medical: toTwoFixed(base * 0.11),
    unemployment: toTwoFixed(base * 0.015),
    employmentInjury: toTwoFixed(base * 0.005),
    maternity: toTwoFixed(base * 0.01),
    housing: toTwoFixed(base * 0.07),
    supplementaryHousing: toTwoFixed(0)
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
export function calculateIncomeTax(salary, thresholdOfIncomeTax) {
  const ret = calculatePersonal(salary);
  const sum = ret.endowment + ret.medical + ret.unemployment + ret.housing + ret.supplementaryHousing;

  const income = salary - sum - thresholdOfIncomeTax;
  const level = getIncomeTaxLevel(income);
  const incomeTax = income * level.rate - level.cut;
  return toTwoFixed(incomeTax);
}