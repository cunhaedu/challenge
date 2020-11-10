export function getDate(date) {
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = String(newDate.getUTCMonth() + 1);
  const day = String(newDate.getUTCDate());
  let hour = String(newDate.getHours());
  let minutes = String(newDate.getMinutes());

  if (Number(hour) < 10) {
    hour = `0${hour}`;
  }
  if (Number(minutes) < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}/${month}/${year} às ${hour}:${minutes}`;
}
