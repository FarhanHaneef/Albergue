// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut
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

// // Login Functionality for student.html
// document.querySelector("form")?.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value;

//     if (!email || !password) {
//         alert("Please enter both email and password");
//         return;
//     }

//     try {
//         const userCredential = await signInWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );
//         const user = userCredential.user;

//         // Fetch user data from Firestore
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//             const userData = userDoc.data();
//             // Store user data in localStorage
//             localStorage.setItem("userName", userData.name || "User");
//             localStorage.setItem("userEmail", userData.email || email);
//             localStorage.setItem("userId", user.uid);
//         }

//         window.location.href = "newwww.html";
//     } catch (error) {
//         alert(`Login failed: ${error.message}`);
//     }
// });



// // Signup Functionality (for signup.html)
// document.querySelector("#signup-form")?.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const name = document.getElementById("name-id")?.value.trim();
//     const email = document.getElementById("signup-email")?.value.trim();
//     const password = document.getElementById("signup-password")?.value;

//     if (!name || !email || !password) {
//         alert("Please fill in all fields");
//         return;
//     }

//     try {
//         const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );
//         const user = userCredential.user;

//         await setDoc(doc(db, "users", user.uid), {
//             name: name,
//             email: email,
//             createdAt: new Date()
//         });

//         localStorage.setItem("userName", name);
//         localStorage.setItem("userEmail", email);
//         localStorage.setItem("userId", user.uid);
        
//         alert("Registration successful!");
//         window.location.href = "newwww.html";
//     } catch (error) {
//         console.error("Signup error:", error);
//         alert(`Signup failed: ${error.message}`);
//     }
// });

// // Logout functionality
// window.logout = async function() {
//     try {
//         await signOut(auth);
//         localStorage.removeItem("userName");
//         localStorage.removeItem("userEmail");
//         localStorage.removeItem("userId");
//         window.location.href = "albi.html";
//     } catch (error) {
//         console.error("Logout error:", error);
//         alert(`Logout failed: ${error.message}`);
//     }
// };



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth-compat.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore-compat.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4BvknExGN8_aWhuw7lT846Lk0gHGNMMg",
    authDomain: "albergue-1985.firebaseapp.com",
    projectId: "albergue-1985",
    storageBucket: "albergue-1985.appspot.com",
    messagingSenderId: "957761019612",
    appId: "1:957761019612:web:f879fffb4999d3beb9de19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set authentication persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Login Functionality for student.html
document.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        
        // Refresh token to ensure persistence
        await user.getIdToken(true);

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            // Store user data in localStorage
            localStorage.setItem("userName", userData.name || "User");
            localStorage.setItem("userEmail", userData.email || email);
            localStorage.setItem("userId", user.uid);
        }

        window.location.href = "newwww.html";
    } catch (error) {
        alert(`Login failed: ${error.message}`);
    }
});

// Signup Functionality (for signup.html)
document.querySelector("#signup-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name-id")?.value.trim();
    const email = document.getElementById("signup-email")?.value.trim();
    const password = document.getElementById("signup-password")?.value;

    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            createdAt: new Date()
        });

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", user.uid);
        
        alert("Registration successful!");
        window.location.href = "newwww.html";
    } catch (error) {
        console.error("Signup error:", error);
        alert(`Signup failed: ${error.message}`);
    }
});

// Logout functionality
window.logout = async function() {
    try {
        await signOut(auth);
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        window.location.href = "albi.html";
    } catch (error) {
        console.error("Logout error:", error);
        alert(`Logout failed: ${error.message}`);
    }
};