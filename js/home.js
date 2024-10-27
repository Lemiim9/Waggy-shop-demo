import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA59ZHk6OQN6FtLKtiAHK7eYMuvsBukZv8",
  authDomain: "ancaom9-e4954.firebaseapp.com",
  projectId: "ancaom9-e4954",
  storageBucket: "ancaom9-e4954.appspot.com",
  messagingSenderId: "495467809457",
  appId: "1:495467809457:web:bc83ee9390bd6c54683090"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//hàm xử lý việc đăng xuất
document.addEventListener("DOMContentLoaded", () => {
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("displayName");
  };
  onAuthStateChanged(auth, (user) => {

    //lấy phần tử có id là infmtion ,sau đó lưu vào biến infelement
    const inforElement = document.getElementById("information");
    const displayName = localStorage.getItem("displayName");
    if (user) {
      const displayName = user.displayName || "User";
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut' style="padding: 8px 16px; background-color: #f9f3ec; border-radius: 16px; color: black; ountline: none; border: none">Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else if (displayName) {
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut' style="padding: 8px 16px; background-color: #f9f3ec; border-radius: 16px; color: white;">Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else {
      inforElement.innerHTML = `
            <div class='signin'>
                <a href="/html/signin.html" style="padding: 8px 16px; background-color: #f9f3ec; border-radius: 16px">Sign in</a>
            </div>
        `;
    }
  });
});
