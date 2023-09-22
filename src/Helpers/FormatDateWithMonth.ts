export default function FormatDateWithMonth(months: number): string {
  const currentDate = new Date();
  const maturityDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + months,
    currentDate.getDate()
  );

  // Format the maturity date as "MMM DD, YYYY"
  const options:any = { month: "short", day: "2-digit", year: "numeric" as const };
  const formattedMaturityDate = maturityDate.toLocaleDateString(
    "en-US",
    options
  );

  return formattedMaturityDate;
}
