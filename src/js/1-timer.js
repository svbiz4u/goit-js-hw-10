import flatpickr from "flatpickr"; // Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css"

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const datetimePicker = document.getElementById('datetime-picker');
  const startBtn = document.querySelector('[data-start]');
  const daysSpan = document.querySelector('[data-days]');
  const hoursSpan = document.querySelector('[data-hours]');
  const minutesSpan = document.querySelector('[data-minutes]');
  const secondsSpan = document.querySelector('[data-seconds]');

  let countdownInterval;
  let userSelectedDate;
 

  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate < new Date()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
        userSelectedDate = selectedDate;
      }
    },
  });

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    datetimePicker.disabled = true;
    startTimer();
  });

  function startTimer() {
    const endDate = userSelectedDate.getTime();
    countdownInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const remainingTime = endDate - currentDate;
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        startBtn.disabled = false;
        datetimePicker.disabled = false;
      } else {
        const { days, hours, minutes, seconds } = convertMs(remainingTime);
        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
      }
    }, 1000);
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});