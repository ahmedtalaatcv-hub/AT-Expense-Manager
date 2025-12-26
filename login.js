const auth = firebase.auth();
const db = firebase.firestore();

const auth = firebase.auth();
const db = firebase.firestore();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("من فضلك أدخل الإيميل وكلمة السر");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // إنشاء مستند المستخدم
      db.collection("users").doc(user.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      window.location.href = "index.html";
    })
    .catch(error => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("❌ خطأ في تسجيل الدخول");
    });
}


function loginWithGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      // حفظ بيانات المستخدم
      db.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }, { merge: true });

      window.location.href = "index.html";
    })
    .catch(err => {
      console.error(err);
      alert("❌ فشل تسجيل الدخول");
    });
}
