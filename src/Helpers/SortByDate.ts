import { isBefore } from "date-fns";

export function sortByDate(array: any) {
  return array.sort((a: any, b: any) => {
    if (!a.date_of_refund || !b.date_of_refund) {
      // Handle null or undefined dates
      return 0;
    }

    const dateA = new Date(a.date_of_refund);
    const dateB = new Date(b.date_of_refund);

    if (isBefore(dateA, dateB)) {
      return -1;
    } else if (isBefore(dateB, dateA)) {
      return 1;
    } else {
      return 0;
    }
  });
}
