export const viewFullName = (lastName: string | null, firstName: string | null) => `${lastName} ${firstName}`;

export const viewFullNameKana = (lastNameKana: string | null, firstNameKana: string | null) =>
  `${lastNameKana} ${firstNameKana}`;

export const viewSex = (sex: number | null) => (sex === 0 ? '男性' : '女性');

export const viewEmployeeCategory = (employeeCategory: number | null) =>
  employeeCategory === 0 ? '社員' : 'パートナー';

export const viewLaborCost = (laborCost: number | null) => `${!laborCost ? '-' : `¥ ${laborCost.toLocaleString()}`}`;

export const viewProfit = (sales: number | null, cost: number | null): string => {
  return sales && cost ? `¥ ${(sales - cost).toLocaleString()}` : '';
};

export const viewProfitRate = (sales: number | null, cost: number | null): string => {
  return sales && cost ? `${Math.round(((sales - cost) / sales) * 100 * 10) / 10} %` : '';
};
