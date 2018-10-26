import config from '../../common/config/index';

function findItemByKey(key, items) {
  let findItem = {};
  items.some((item) => {
    if (item.key === key) {
      findItem = item;
      return true;
    } else {
      return false;
    }
  });
  return findItem;
}

// 把属性的值全部相加
function sumAllProperties(obj) {
  let sum = 0;
  for (const prop in obj) {
    sum += obj[prop];
  }
  return sum;
}

// 保留两位小数
export function toTwoFixed(num) {
  return parseFloat(num.toFixed(2));
}

// 获取社保基数
function getSocialSecurityBase(salary, settings) {
  let base = salary;
  if (salary >= settings.maxSocialSecurityBase) {
    base = settings.maxSocialSecurityBase;
  } else if (salary <= settings.minSocialSecurityBase) {
    base = settings.minSocialSecurityBase;
  }
  return base;
}

/**
 * 获取扣税档次信息
 * @param {number} income 应纳税所得额
 * @param {object} taxLevels 税率表
 */
function getIncomeTaxLevel(income, taxLevels) {
  let findItem = {};
  taxLevels.some((item) => {
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
 * @param {number} salary 税前月薪
 */
export function calculatePersonal(salary, settings) {
  const base = getSocialSecurityBase(salary, settings);

  const housing = toTwoFixed(base * settings.housing / 100);
  let extraHousing = 0;
  if (settings.isExistedSupplementaryHousing) {
    extraHousing = toTwoFixed(base * settings.supplementaryHousing / 100);
  }

  const r = {
    endowment: toTwoFixed(base * 0.08),
    medical: toTwoFixed(base * 0.02),
    unemployment: toTwoFixed(base * 0.005),
    housing: housing,
    supplementaryHousing: extraHousing
  };

  const sum = toTwoFixed(sumAllProperties(r));
  return {
    ...r,
    sum
  }
}

/**
 * 计算公司部分
 * @param {number} salary 税前月薪
 */
export function calculateCompany(salary, settings) {
  const base = getSocialSecurityBase(salary, settings);

  const housing = toTwoFixed(base * settings.housing / 100);
  let extraHousing = 0;
  if (settings.isExistedSupplementaryHousing) {
    extraHousing = toTwoFixed(base * settings.supplementaryHousing / 100);
  }

  const r = {
    endowment: toTwoFixed(base * 0.20),
    medical: toTwoFixed(base * 0.11),
    unemployment: toTwoFixed(base * 0.015),
    employmentInjury: toTwoFixed(base * 0.005),
    maternity: toTwoFixed(base * 0.01),
    housing: housing,
    supplementaryHousing: extraHousing
  };

  const sum = toTwoFixed(sumAllProperties(r));
  return {
    ...r,
    sum
  }
}

/**
 * 计算个人所得税
 * 
 * (公式)
 * 应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点
 * 应纳税额 = 应纳税所得额 x 税率 － 速算扣除数
 * 
 * @param {number} salary 税前月薪
 * @param {number} thresholdOfIncomeTax 个税起征点
 * @param {object} taxLevels 税率表
 * @param {object} settings 参数设置
 * @param {boolean} type 老版false, 新版true
 */
export function calculateIncomeTax(salary, thresholdOfIncomeTax, taxLevels, settings, type) {
  if (salary <= thresholdOfIncomeTax) {
    return 0.0;
  }

  const ret = calculatePersonal(salary, settings);

  let cut = 0;
  if (type) {
    cut = getExtraCut(settings);
  }

  let income = salary - ret.sum - thresholdOfIncomeTax - cut;
  if (income <= 0) {
    income = 0.000001;
  }

  const level = getIncomeTaxLevel(income, taxLevels);
  const incomeTax = income * level.rate - level.cut;
  return toTwoFixed(incomeTax);
}

/**
 * 计算 个税专项附加扣除
 * @param {object} settings 设置参数
 */
export function getExtraCut(settings) {
  let sum = 0;

  // 存在首套房贷，按照每年12000元（每月1000元）标准定额扣除
  if (settings.isExistedFirstMortgage) {
    sum += 1000;
  }

  // （一）承租的住房位于直辖市、省会城市、计划单列市以及国务院确定的其他城市，扣除标准为每年14400元（每月1200元）；
  // （二）承租的住房位于其他城市的，市辖区户籍人口超过100万的，扣除标准为每年12000元（每月1000元）。
  // （三）承租的住房位于其他城市的，市辖区户籍人口不超过100万（含）的，扣除标准为每年9600元（每月800元）。
  if (settings.isExistedHouseRent) {
    const item = findItemByKey(settings.houseRentIndex, config.houseRent);
    sum += item.cut;
  }

  // 纳税人的子女接受学前教育和学历教育的相关支出，按照每个子女每年12000元（每月1000元）的标准定额扣除
  if (settings.isExistedChildrenEducation) {
    const item = findItemByKey(settings.childrenIndex, config.childrenEducation);
    sum += item.cut;
  }

  // 每月2000元，按兄弟姐妹平分
  if (settings.isExistedElderlyParents) {
    sum += 2000 / settings.brothersNumber;
  }

  // 纳税人接受学历继续教育的支出，在学历教育期间按照每年4800元（每月400元）定额扣除。
  // 纳税人接受技能人员职业资格继续教育、专业技术人员职业资格继续教育支出，在取得相关证书的年度，按照每年3600元定额扣除。
  if (settings.isExistedContinuingEducation) {
    const item = findItemByKey(settings.continuingEducationIndex, config.continuingEducation);
    sum += item.cut;
  }

  return toTwoFixed(sum);
}