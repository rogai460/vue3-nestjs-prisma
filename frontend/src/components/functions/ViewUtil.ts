export const viewFullName = (
  lastName: string | null,
  firstName: string | null,
) => `${lastName} ${firstName}`;

export const viewFullNameKana = (
  lastNameKana: string | null,
  firstNameKana: string | null,
) => `${lastNameKana} ${firstNameKana}`;

export const viewSex = (sex: number | null) => (sex === 0 ? '男性' : '女性');

export const viewEmployeeCategory = (employeeCategory: number | null) =>
  employeeCategory === 0 ? '社員' : 'パートナー';

export const viewLaborCost = (laborCost: number | null) =>
  `${!laborCost ? '-' : `¥ ${laborCost.toLocaleString()}`}`;
