// Firebase setup
const firebaseConfig = { 
  apiKey: "AIzaSyCXa8-PBHUqkfFlQEg9_k7z1MCLoirFYYQ",
  authDomain: "tayoforum.firebaseapp.com",
  projectId: "tayoforum",
  storageBucket: "tayoforum.appspot.com",
  messagingSenderId: "1055771060043",
  appId: "1:1055771060043:web:1258fee943f4c3652aaace",
  measurementId: "G-2JDNXQHYS3" 
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Post message
document.getElementById("post").onclick = async () => {
  const name = document.getElementById("username").value.trim();
  const msg = document.getElementById("message").value.trim();
  if (!name || !msg) return alert("Type something!");
  
  await db.collection("messages").add({
    name,
    msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  
  document.getElementById("message").value = "";
};

// Show messages live
db.collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const list = document.getElementById("messages");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");

    const date = d.timestamp ? new Date(d.timestamp.toMillis()).toLocaleString() : "Just now";
    li.innerHTML = `<strong>${d.name}</strong> <span style="color:#888;font-size:0.85rem;">[${date}]</span><br>${d.msg}`;
    
    list.appendChild(li);
  });
});
