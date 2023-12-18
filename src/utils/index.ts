const convertDateToHour = utcTime => {
  const date = new Date(utcTime);

  date.setHours(date.getHours());

  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const localTime = hours + ':' + minutes;
  return localTime;
};

const convertDateToWeekday = timestamp => {
  const date = new Date(timestamp);

  const options: Object = {weekday: 'long'};
  const weekday = new Intl.DateTimeFormat('vi-VN', options).format(date);

  return weekday;
};

const convertDateToDay = timestamp => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export {convertDateToHour, convertDateToWeekday, convertDateToDay};
