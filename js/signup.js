// thêm thư viện
import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
//cấu hình firebase
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
const db = getFirestore(app);
//gọi thẻ form có id là form signup,lưu vào biến form signup
const formSignUp = document.getElementById("form-signup");
//gọi thẻ bt có id là form signup,lưu vào biến form signup
const submitButton = document.getElementById("submit-btn");

//xác thực email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
//validatePassword dùng để kiểm tra mật khẩu lớn hơn hoặc bằng 6 kí tự
function validatePassword(password) {
  return password.length >= 6; // Adjust this based on security requirements
}
 
//cho fsup lắng nghe sk submit,nếu có submit thì sẽ thực hiện các lệnh trong hàm
formSignUp.addEventListener("submit", async (e) => {
  //ngăn chặn hành vi mặc định của form
  e.preventDefault();
  //khi bấm xong nút submit thì sẽ vô hiệu hóa, ngăn chặn ng dùng bấm liên tục vào nút
  submitButton.disabled = true;

  //hiển thị thông báo đăng nhập đăng ký
  const loadingToast = Toastify({
    text: "Registering...",
    duration: -1,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#333",
    stopOnFocus: true,
  }).showToast();

  //lấy giá trị từ ô input
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  //kiểm tra nếu k nhập thông tin gì mà bấm sign up thì sẽ hiển thị thông báo
  if (!firstName || !lastName || !email || !password) {
    loadingToast.hideToast();
    Toastify({
      text: "Please fill out all fields.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
    submitButton.disabled = false;
    return;
  }

  if (!validateEmail(email)) {
    loadingToast.hideToast();
    Toastify({
      text: "Invalid email format.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
    submitButton.disabled = false;
    return;
  }

  if (!validatePassword(password)) {
    loadingToast.hideToast();
    Toastify({
      text: "Password must be at least 6 characters.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
    submitButton.disabled = false;
    return;
  }
 // ddangwkys ng dùng vs email,pasw
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
 
    // caapkj nhật lại trg thông tin displayName
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });
    
// lưu th tin ng dùng vào fbdta vs colecction là users
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
    });

    loadingToast.hideToast();

    Toastify({
      text: "Register Successfully!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#4CAF50",
      stopOnFocus: true,
    }).showToast();

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 3000);
  } catch (error) {
    loadingToast.hideToast();
    Toastify({
      text: "Error: " + error.message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
  } finally {
    submitButton.disabled = false;
  }
});
