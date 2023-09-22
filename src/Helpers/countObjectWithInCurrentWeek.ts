import { isSameMonth, isSameWeek } from "date-fns";

export function countObjectsWithinCurrentWeek(
  objects: { [key: string]: any }[],
  property: string
): number {
  let count = 0;

  for (let i = 0; i < objects.length; i++) {
    if (property in objects[i]) {
      const objectDate = objects[i][property];
      if (isSameWeek(new Date(), objectDate)) {
        count++;
      }
    }
  }

  return count;
}

export function countObjectsWithinCurrentMonth(
    objects: { [key: string]: any }[],
    property: string
  ): number {
    let count = 0;
  
    for (let i = 0; i < objects.length; i++) {
      if (property in objects[i]) {
        const objectDate = objects[i][property];
        if (isSameMonth(new Date(), objectDate)) {
          count++;
        }
      }
    }
  
    return count;
  }
  