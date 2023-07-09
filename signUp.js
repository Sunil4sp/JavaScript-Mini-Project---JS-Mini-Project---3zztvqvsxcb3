(() => {
    'use strict';
  
    // Get the register button element
    const registerButton = document.getElementById("registerButton");
  
    // Add click event listener to the register button
    registerButton.addEventListener('click', event => {
      let form = registerButton.closest('form');
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        let name = document.getElementById("form3Example1cg").value;
        let username = document.getElementById("form3Example3cg").value;
        let password = document.getElementById("form3Example4cg").value;
  
        window.sessionStorage.setItem("name", name);
        window.sessionStorage.setItem("username", username);
        window.sessionStorage.setItem("password", password);
  
        alert("User Created. Kindly login.");
        /* setTimeout(() => {
          window.location.href = "./signIn.html";
        }, 2000); */
      }
  
      form.classList.add('was-validated');
    });
  })();