const [form] = document.forms;
const [emailFeedback, passwordFeedback] = document.querySelectorAll('.feedback');

const isEmailValid = email => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email);
}

const isPasswordValid = password => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm.test(password);
}

const validation = (email, password) => {
  return isEmailValid(email) && isPasswordValid(password);
}

const toggleShowPassword = (toggler, elements) => {
  toggler.addEventListener('change', e => {
    elements.forEach(element => {
      element.setAttribute('type', e.target.checked ? 'text' : 'password');
    });
  });
};

const getElement = (name, e) => {
  return {
    email(e) {
      e.target.classList.toggle('border-danger', !isEmailValid(e.target.value));
      emailFeedback.textContent = isEmailValid(e.target.value) ? null : 'Provide a valid email address';
    },
    password(e) {
      e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value));
      passwordFeedback.textContent = isPasswordValid(e.target.value) ? null : 'Password must be at least 7 characters long and contain 1 capital letter and 1 symbol or number';
    }
  }[name](e);
}

const handleInput = e => {
  const { email, password, btn } = form;
  const { name } = e.target;
  
  getElement(name, e);
  
  btn.disabled = !validation(email.value, password.value);
}

document.addEventListener('DOMContentLoaded', () => {
  toggleShowPassword(form.showPassword, [form.password]);
  
  form.email.addEventListener('input', handleInput);
  
  form.password.addEventListener('input', handleInput);
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { email, password, rememberMe } = e.target;
    const submittedValue = {
      email: email.value,
      password: password.value,
      isRememberMeChecked: rememberMe.checked
    };
    
    // Check console to see the result
    console.log(submittedValue);
    let storedUsername = window.sessionStorage.getItem("username");
    let storedPassword = window.sessionStorage.getItem("password");
  
    if (storedUsername === email.value && storedPassword === password.value) {
      alert("Login successful");
      window.location.href = "./home.html";
    } else {
      alert("Invalid username or password");
    }
  });
});