export const convertDate = (date: string): Date =>
  date ? new Date(`${date}T09:00:00`) : null;

export const beginningMonthDay = (year: number, month: number): Date =>
  new Date(
    `${String(year).padStart(2, '0')}-${String(month).padStart(
      2,
      '0',
    )}-01T09:00:00`,
  );

export const endMonthDay = (year: number, month: number): Date => {
  const date = beginningMonthDay(year, month);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
};
