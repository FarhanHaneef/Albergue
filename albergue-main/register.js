
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// // import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // const firebaseConfig = {
// //     apiKey: "AIzaSyD4BvknExGN8_aWhuw7lT846Lk0gHGNMMg",
// //     authDomain: "albergue-1985.firebaseapp.com",
// //     projectId: "albergue-1985",
// //     storageBucket: "albergue-1985.firebasestorage.app",
// //     messagingSenderId: "957761019612",
// //     appId: "1:957761019612:web:f879fffb4999d3beb9de19"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);



// // //submit button
// // const submit = document.getElementById('submit');
// // submit.addEventListener("click", function (event) {
// //     event.preventDefault()
// //     //inputs
// //     const email = document.getElementById('email').value;
// //     const password = document.getElementById('password').value;
    
// //     const auth = getAuth();
// //     createUserWithEmailAndPassword(auth, email, password)
// //         .then((userCredential) => {
// //             // Signed up 
// //             const user = userCredential.user;
// //             // alert("Creating Account...")
// //             window.location.href="student.html";
// //             // ...
// //         })
// //         .catch((error) => {
// //             const errorCode = error.code;
// //             const errorMessage = error.message;
// //             alert(errorMessage)
// //             // ..
// //         });


// // })


// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
// } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyD4BvknExGN8_aWhuw7lT846Lk0gHGNMMg",
//     authDomain: "albergue-1985.firebaseapp.com",
//     projectId: "albergue-1985",
//     storageBucket: "albergue-1985.firebasestorage.app",
//     messagingSenderId: "957761019612",
//     appId: "1:957761019612:web:f879fffb4999d3beb9de19"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Login Functionality (single implementation)
// document
//   .querySelector("#login-form")
//   ?.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const email = document.getElementById("login-email")?.value.trim();
//     const password = document.getElementById("login-password")?.value;

//     if (!email || !password) {
//       alert("Please enter both email and password");
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Fetch user data from Firestore
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         localStorage.setItem("userName", userData.name || "User");
//       }

//       window.location.href = "homepage.html";
//     } catch (error) {
//       alert(`Login failed: ${error.message}`);
//     }
//   });

// // Signup Functionality
// document
//   .querySelector("#signup-form")
//   ?.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const name = document.getElementById("name-id")?.value.trim();
//     const email = document.getElementById("signup-email")?.value.trim();
//     const password = document.getElementById("signup-password")?.value;

//     if (!name || !email || !password) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         name: name,
//         email: email,
//       });

//       localStorage.setItem("userName", name);
//       window.location.href = "homepage.html";
//     } catch (error) {
//       alert(`Signup failed: ${error.message}`);
//     }
//   });



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4BvknExGN8_aWhuw7lT846Lk0gHGNMMg",
    authDomain: "albergue-1985.firebaseapp.com",
    projectId: "albergue-1985",
    storageBucket: "albergue-1985.firebasestorage.app",
    messagingSenderId: "957761019612",
    appId: "1:957761019612:web:f879fffb4999d3beb9de19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Functionality
document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name-id").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date()
      });

      localStorage.setItem("userName", name);
      alert("Registration successful!");
      window.location.href = "student.html";
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.message}`);
    }
  });