// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
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

// Admin credentials
const adminEmail = "admin@mail.com"; // Replace with your admin email
const adminPassword = "sec123"; // Replace with your admin password

// Handle admin login
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === adminEmail && password === adminPassword) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Admin logged in:", userCredential.user.email);
      alert("Login successful! Redirecting to the admin dashboard...");
      window.location.href="adminnn.html";
      // Redirect or show admin dashboard here
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Authentication failed. Please try again.");
    }
  } else {
    alert("Invalid email or password for admin login.");
  }
});
