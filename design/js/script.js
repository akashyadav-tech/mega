let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

// Register page pe user save karna
function saveUser(e){
   e.preventDefault();

   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let photo = document.getElementById("photo").files[0];

   let reader = new FileReader();
   reader.onload = function(){
      let user = {
         name: name,
         email: email,
         photo: reader.result
      };

      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration Successful!");
      window.location.href = "home.html";
   }
   reader.readAsDataURL(photo);
}

// Home page pe user load karna
window.onload = function(){
   let user = JSON.parse(localStorage.getItem("user"));
   if(user){
      let pic = document.getElementById("profilePic");
      let name = document.getElementById("profileName");
      let email = document.getElementById("profileEmail");

      if(pic) pic.src = user.photo;
      if(name) name.innerText = user.name;
      if(email) email.innerText = user.email;
   }
}

 document.addEventListener("DOMContentLoaded", () => {
   const user = JSON.parse(localStorage.getItem("user"));

if(user){
   // Header Profile (photo unchanged)
   document.getElementById("headerProfileName").innerText = user.name || "Guest";
   document.getElementById("headerProfileEmail").innerText = user.email || "";

   // Sidebar Profile (photo unchanged)
   document.getElementById("profileName").innerText = user.name || "Guest";
   document.getElementById("profileEmail").innerText = user.email || "";
}
});


   function logout(){
      localStorage.removeItem("user");
      window.location.href = "login.html";
   }

// Logout
function logout(){
   localStorage.removeItem("user");
   window.location.href = "login.html";
}


function logout(){
  localStorage.clear();
  window.location.href = "login.html";
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}


  document.getElementById("loginForm").addEventListener("submit", function(e){
      e.preventDefault(); // form submit stop
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      // abhi ke liye fixed login check (later backend ke sath real)
      if(email === "student@gmail.com" && password === "123456"){
         localStorage.setItem("loggedIn", "true"); // login status save
         window.location.href = "home.html"; // redirect to home
      } else {
         alert("Invalid email or password!");
      }
   });

   function logout(){
   localStorage.removeItem("token"); // token hata do
   alert("Logged out successfully!");
   window.location.href = "login.html"; // login page pe bhej do
}