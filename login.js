const auth = firebase.auth();
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

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
