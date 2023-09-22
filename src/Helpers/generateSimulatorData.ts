export default function generateSimulatorData() {
  const objects = [];

  for (let month = 3; month < 5; month+=1) {
    objects.push({
      month: month,
      interet: 4,
      status: false,
    });
  }

  for (let month = 6; month <= 17; month+=1) {
    objects.push({
      month: month,
      interet: 5,
      status: false,
    });
  }

  for (let month = 18; month <= 36; month += 1) {
    objects.push({
      month: month,
      interet: 5.5,
      status: false,
    });
  }
  objects[2].status = true;
  return objects;
}
