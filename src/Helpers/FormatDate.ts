function FormatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default FormatDate;
