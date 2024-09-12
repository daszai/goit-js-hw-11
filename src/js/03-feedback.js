import throttle from 'lodash.throttle/index';

const form = document.querySelector('.feedback-form');
const email = form.children[0].children[0];
const message = form.children[1].children[0];

let json = {
  email: '',
  message: '',
};

if (localStorage.getItem('feedback-form-state') != null) {
  json = JSON.parse(localStorage.getItem('feedback-form-state'));
  email.value = json.email;
  message.value = json.message;
}

form.addEventListener(
  'input',
  throttle(e => {
    json.email = email.value;
    json.message = message.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(json));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.removeItem('feedback-form-state');
  console.log(json);
  message.value = '';
  email.value = '';
  json = {
    email: '',
    message: '',
  };
});
