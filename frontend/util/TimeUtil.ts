/* eslint-disable no-magic-numbers */

//2018-06-01T00:00:00.000
export function getISODate(date: Date) {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `.${pad(date.getMilliseconds(), 3)}`;
}

export function getWeekDate(date: Date) {
  return ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'][date.getDay()];
}

export function getFullDate(date: Date) {
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// eslint-disable-next-line no-magic-numbers
function pad(num: number, padSize = 2) {
  return num.toString().padStart(padSize, '0');
}
