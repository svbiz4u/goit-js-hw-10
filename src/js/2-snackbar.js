// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector('button');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const userTime = Number(form.delay.value);
  const btnState = form.querySelector('input[name="state"]:checked');
  const userBtnState = btnState.value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (userBtnState === 'fulfilled') {
        res(userTime);
      } else {
        rej(userTime);
      }
    }, userTime);
  });

  promise
    .then(function (delay) {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        fontSize: 'large',
        close: true,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        icon: false,
      });
    })
    .catch(function (delay) {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        fontSize: 'large',
        close: true,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        icon: false,
      });
    });

  form.reset();
});