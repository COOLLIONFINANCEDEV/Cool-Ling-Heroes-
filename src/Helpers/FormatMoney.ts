function FormatMoney(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(amount);
}

export function formatNumberWithLeadingZero(value?: number): string {
  if (typeof value === 'number') {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value.toString();
    }
  } else {
    return '00';
  }
}
export default FormatMoney;
