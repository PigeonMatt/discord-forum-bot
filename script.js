// Firebase setup
const firebaseConfig = { /* paste your config here */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Post message
document.getElementById("post").onclick = async () => {
  const name = document.getElementById("username").value;
  const msg = document.getElementById("message").value;
  if (!name || !msg) return alert("Type something!");
  await db.collection("messages").add({
    name, msg, date: new Date().toLocaleString()
  });
  document.getElementById("message").value = "";
};

// Show messages live
db.collection("messages").orderBy("date", "desc").onSnapshot(snapshot => {
  const list = document.getElementById("messages");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `[${d.date}] ${d.name}: ${d.msg}`;
    list.appendChild(li);
  });
});
