function FormatDate(dateParams: Date): string {
  const date = new Date(dateParams);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

export default FormatDate;