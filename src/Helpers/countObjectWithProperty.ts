export function countObjectsWithProperty(
  objects: { [key: string]: any }[],
  property: string
): number {
  let count = 0;

  for (let i = 0; i < objects.length; i++) {
    if (property in objects[i]) {
      const valeur = objects[i][property];
      if(valeur) count++
    }
  }

  return count;
}
