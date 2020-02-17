export function getWeekDate(date: Date) {
  return ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'][date.getDay()];
}

export function getFullDate(date: Date) {
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function pad2(num: number) {
  const padSize = 2;
  return num.toString().padStart(padSize, '0');
}
