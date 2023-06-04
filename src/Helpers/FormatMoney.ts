function FormatMoney(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(amount);
}
export default FormatMoney;
