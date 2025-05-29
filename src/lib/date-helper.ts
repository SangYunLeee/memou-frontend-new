export const changeDateFormat = (utcDate: string, isDetails?: boolean) => {
  if (!utcDate) return '';
  const date = new Date(utcDate);
  let options : Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Seoul' };
  if (isDetails) {
    options = { ...options, hour: '2-digit', minute: '2-digit' };
  }
  return date.toLocaleDateString('ko-KR', options);
};
