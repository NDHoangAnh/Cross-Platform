import {format, parseISO} from 'date-fns';

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

const convertMonthToString = index => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[index];
};

const formatTime = date => {
  const dateObject = parseISO(date);
  return format(dateObject, 'HH:mm');
};

const formatTimeEdit = date => {
  const dateObject = parseISO(date);
  return format(dateObject, 'HH:mm dd/MM/yyyy');
};

const formatDate = date => {
  const dateObject = parseISO(date);
  return format(dateObject, 'HH:mm - dd / MMMM / yyyy');
};

export {
  convertDateToHour,
  convertDateToWeekday,
  convertMonthToString,
  convertDateToDay,
  formatTime,
  formatDate,
  formatTimeEdit,
};
