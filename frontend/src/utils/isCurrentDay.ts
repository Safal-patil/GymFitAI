export function isCurrentDays(date: Date, timeZone: string): boolean {
  const toDateString = (d: Date) =>
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);

  const targetDateStr = toDateString(date);
  const nowDateStr = toDateString(new Date());
    // console.log(targetDateStr, nowDateStr, "targetDateStr");
    
  return targetDateStr === nowDateStr;
}
