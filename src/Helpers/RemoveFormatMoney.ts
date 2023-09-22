function removeThousandsSeparator(amount: string): number {
  const value = amount.replace(/,/g, "");
  return parseInt(value ?? 0);
}

export default removeThousandsSeparator;
