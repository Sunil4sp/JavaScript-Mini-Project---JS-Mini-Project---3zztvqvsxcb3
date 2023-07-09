const search = document.getElementById("search-box");
const button1 = document.getElementById("submit");
const button2 = document.getElementById("get-hotel");
const button3 = document.getElementById("submitClick");
const display = document.getElementById("get-searched-data");
const ul = document.getElementById("authors");
const list = document.createDocumentFragment();
const container = document.getElementById("container");
const selectDate1 = document.getElementById("date1");
const selectDate2 = document.getElementById("date2");
const user = document.getElementById("logged");
var logged = document.querySelector('#logged');


const value = search.value;
var count = 0;

button1.addEventListener('click', (e) => {
  
  e.preventDefault();
  let value = search.value;
  let username = sessionStorage.getItem("username");
  let name = sessionStorage.getItem("name");
  console.log(username);
  
    if(!value){
        container.style.display = "none";
      }
    else{
      if (value && value.trim().length > 0 && username) {
        let users = document.createElement("span");
        users.innerText = "Welcome, " + name;
        /* let loginChecked = true; */
        list.appendChild(users);
        user.appendChild(list);

        value = value.trim().toLowerCase();
        container.style.display = "block";
        console.log(value);
        count++;
        console.log("count:", count);
        
        // link click to logout
        logged.addEventListener('mouseover', function(e){
  
          this.innerHTML = "Logout";
        });
        
        logged.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent the default link behavior
        
          logout();
        });

          function logout(){
            if(logged.innerHTML === "Logout"){
                users.innerHTML = "";
                console.log(users.innerHTML);
            }
                alert("Logged out");
                window.location.href = "./signIn.html";
          }
          
      } 
      else {
        // User is not logged in
        alert("Please log in to access this feature.");
        search.innerText = "";
        document.getElementsByClassName("date").innerText = "";
        // Redirect the user to the login page
        window.location.href = "./signIn.html";
      } 
    }
});

button2.addEventListener('click', async function() {
  let value = search.value;
  console.log(selectDate1.value, selectDate2.value);
  if (selectDate1.value == "" || selectDate2.value == "") {
    alert("Select Check-In and Check-Out dates.");
  } else {
    if (count <= 1) {
      try {
        const response = await fetch(
          `https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels`
        );
        const hotels = await response.json();
        console.log(hotels);

        try {
          hotels.forEach(function(item) {
            item.city = item.city.toLowerCase();
            if (value === item.city) {
              let li = document.createElement("span");
              let city = document.createElement("h5");
              let hotelName = document.createElement("span");
              var linebreak = document.createElement("br");
              var checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.value = value;
              
              //when checkbox checked than book button to enable
              checkbox.addEventListener("change", function(event) {
                if (this.checked) {
                  const selectedValue = this.value;
                  console.log(selectedValue);
                }
                let checked = event.target;
                console.log(checked);
                if (!checked) {
                  button3.style.display = "none";
                } else {
                  button3.style.display = "block";
                }
                window.sessionStorage.setItem("checkedStatus",checked);
              });

              city.innerHTML = item.city;
              hotelName.innerHTML = item.hotel_name;
              
              
              window.sessionStorage.setItem("city", city.innerText);
              window.sessionStorage.setItem("hotelName", hotelName.innerText);

              li.appendChild(city);
              li.appendChild(hotelName);
              li.appendChild(checkbox);
              li.appendChild(linebreak);
              list.appendChild(li);
            }
          });
        } catch (error) {
          console.log(error);
        }
        ul.appendChild(list);
      } catch (error) {
        console.log(error);
      }
      count++;
    } else {
      document.getElementsByClassName("date").textContent = "";
      count++;
    }
  }
});

button3.addEventListener("click", function(e){
    e.preventDefault();
    console.log(search.value);
    search.value = "";
    
    container.textContent = "Booking Done";
    bookingStatus();
    /* window.location.href = "./home.html"; */
});

function bookingStatus(){
  let span = document.createElement("span");
  let br = document.createElement("br");

  span.appendChild(br);
  

  let bookingStatus = document.createElement("button");
  span.appendChild(br);
  bookingStatus.innerText = "Status";

  span.appendChild(bookingStatus);
  list.appendChild(span);

  bookingStatus.setAttribute('id','status');
  container.appendChild(list);

  document.getElementById("status").addEventListener("click", (e) =>{

    let username = sessionStorage.getItem("username");
    let name = sessionStorage.getItem("name");
    let city = sessionStorage.getItem("city");
    let hotelName = sessionStorage.getItem("hotelName");

    let showStatus = document.createElement("span");
    
    let showStatusValues = [username, name, city, hotelName];

    showStatusValues.forEach(function (value) {
      let listItem = document.createElement("li");
      listItem.innerText = value;
      showStatus.appendChild(listItem);
    });
    let container = document.getElementById("container");
    container.appendChild(showStatus);
  });
}

/* const leave = document.querySelector("#logout");

leave.addEventListener("click", () => {
    alert("Logged out")
    window.location.href = "./signIn.html"
}); */


/*logout = document.querySelector('#logout');


 login.addEventListener('click', function(e){
  
  this.innerHTML = "Logout";
  let users = sessionStorage.getItem("users");
  if(this.innerHTML == "Logout"){
    users.innerHTML = "";
    console.log(users.innerHTML);
  }
  alert("Logged out");
  window.location.href = "./signIn.html";
  
}); */
/* logout.addEventListener('click', function(e){
  /* this.classList.add('is-hidden');
  login.classList.remove('is-hidden'); 
  window.location.href = './signIn.html';
  login.innerHTML = "Login";
}); */