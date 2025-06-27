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
