function FormatDate(dateParams: Date): string {
  const date = new Date(dateParams);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default FormatDate;