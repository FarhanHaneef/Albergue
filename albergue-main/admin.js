// // import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// // import { getFirestore, doc, getDoc } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD4BvknExGN8_aWhuw7lT846Lk0gHGNMMg",
//     authDomain: "albergue-1985.firebaseapp.com",
//     projectId: "albergue-1985",
//     storageBucket: "albergue-1985.firebasestorage.app",
//     messagingSenderId: "957761019612",
//     appId: "1:957761019612:web:f879fffb4999d3beb9de19"
// };

// // Initialize Firebase


// // const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // const db = getFirestore(app);

// // Admin login function
// async function adminLogin(email, password) {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Check if user is an admin (by custom claim or Firestore)
//     const isAdmin = await checkAdminStatus(user.uid);

//     if (isAdmin) {
//       console.log("Admin login successful!");
//       window.location.href="profile.html";
//       // Redirect to admin dashboard or perform admin-specific actions
//     } else {
//       console.log("Access denied. You are not an admin.");
//       await auth.signOut(); // Log out non-admin users
//     }
//   } catch (error) {
//     console.error("Login failed:", error.message);
//   }
// }

// // // Function to check admin status
// // async function checkAdminStatus(uid) {
// //   try {
// //     // Example: Check Firestore for admin role
// //     const userDoc = await getDoc(doc(db, "users", uid));
// //     if (userDoc.exists()) {
// //       const userData = userDoc.data();
// //       return userData.role === "admin"; // Assuming a "role" field in Firestore
// //     }
// //     return false;
// //   } catch (error) {
// //     console.error("Error checking admin status:", error.message);
// //     return false;
// //   }
// // }

// // // Monitor auth state changes
// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     console.log("User logged in:", user.email);
// //   } else {
// //     console.log("No user logged in.");
// //   }
// // });

// // Example usage (replace with actual inputs from your login form)
// const email = "admin123@mail.com";
// const password = "111222";
// adminLogin(email, password);
  

//////////////////////////////////////////////////////////////////////////////////


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
