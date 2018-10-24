const config = {
  oldThresholdOfIncomeTax: 3500, // 老的起征点
  newThresholdOfIncomeTax: 5000, // 新的起征点

  minSocialSecurityBase: 4279, // 社保基数下限
  maxSocialSecurityBase: 21396, // 社保基数上限

  // 老的税率表
  oldIncomeTaxLevels: [
    { min: 0, max: 1500, rate: 0.03, cut: 0 },
    { min: 1500, max: 4500, rate: 0.10, cut: 105 },
    { min: 4500, max: 9000, rate: 0.20, cut: 555 },
    { min: 9000, max: 35000, rate: 0.25, cut: 1005 },
    { min: 35000, max: 55000, rate: 0.30, cut: 2755 },
    { min: 55000, max: 80000, rate: 0.35, cut: 5505 },
    { min: 80000, max: -1, rate: 0.45, cut: 13505 }
  ],

  // 新的税率表
  newIncomeTaxLevels: [
    { min: 0, max: 3000, rate: 0.03, cut: 0 },
    { min: 3000, max: 12000, rate: 0.10, cut: 210 },
    { min: 12000, max: 25000, rate: 0.20, cut: 1410 },
    { min: 25000, max: 35000, rate: 0.25, cut: 2660 },
    { min: 35000, max: 55000, rate: 0.30, cut: 4410 },
    { min: 55000, max: 80000, rate: 0.35, cut: 7160 },
    { min: 80000, max: -1, rate: 0.45, cut: 15160 }
  ],

  // 公积金比例
  housingRate: [5, 6, 7],

  // 补充公积金比例
  supplementaryHousingRate: [1, 2, 3, 4, 5],

  // 租房抵扣
  houseRent: [
    { key: 0, desc: '直辖市、省会城市、计划单列市', cut: 1200 },
    { key: 1, desc: '其它城市,户籍人口超过100万的城市', cut: 1000 },
    { key: 2, desc: '其它城市,户籍人口不超过100万的城市', cut: 800 }
  ],

  // 首套房贷款抵扣
  firstMortgageCut: 1000,

  // 子女教育抵扣
  childrenEducation: [
    { key: 0, desc: '1', cut: 1000 },
    { key: 1, desc: '2', cut: 2000 }
  ],

  // 继续教育
  continuingEducation: [
    { key: 0, desc: '学历教育', cut: 400 },
    { key: 1, desc: '非学历教育', cut: 300 }
  ]
};

export default config;
