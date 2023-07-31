import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackLocalStorageKey = 'feedback-form-state';


function getStoredFormState() {
  const storedState = localStorage.getItem(feedbackLocalStorageKey);
  return storedState ? JSON.parse(storedState) : {};
}


function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(feedbackLocalStorageKey, JSON.stringify(formState));
}

window.addEventListener('DOMContentLoaded', () => {
  const storedFormState = getStoredFormState();
  emailInput.value = storedFormState.email || '';
  messageInput.value = storedFormState.message || '';
});


const throttledSaveFormState = throttle(saveFormState, 500);

form.addEventListener('input', () => {
  throttledSaveFormState();
});


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

 
  emailInput.value = '';
  messageInput.value = '';

  localStorage.removeItem(feedbackLocalStorageKey);


  console.log(formState);
});
