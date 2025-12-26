// Firebase Auth & Firestore
const auth = firebase.auth();
const db = firebase.firestore();

/* =========================
   إنشاء حساب جديد
========================= */
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("❌ من فضلك أدخل البريد الإلكتروني وكلمة المرور");
    return;
  }

  if (password.length < 6) {
    alert("❌ كلمة المرور يجب ألا تقل عن 6 أحرف");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // إنشاء ملف المستخدم في Firestore
      return db.collection("users").doc(user.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("✅ تم إنشاء الحساب بنجاح");
      window.location.href = "index.html";
    })
    .catch(error => {
      handleAuthError(error);
    });
}

/* =========================
   تسجيل الدخول
========================= */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("❌ من فضلك أدخل البريد الإلكتروني وكلمة المرور");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      handleAuthError(error);
    });
}

/* =========================
   تسجيل الخروج
========================= */
function logout() {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}

/* =========================
   معالجة الأخطاء
========================= */
function handleAuthError(error) {
  let message = "❌ حدث خطأ، حاول مرة أخرى";

  switch (error.code) {
    case "auth/email-already-in-use":
      message = "❌ هذا البريد مستخدم بالفعل";
      break;
    case "auth/invalid-email":
      message = "❌ البريد الإلكتروني غير صالح";
      break;
    case "auth/user-not-found":
      message = "❌ لا يوجد حساب بهذا البريد";
      break;
    case "auth/wrong-password":
      message = "❌ كلمة المرور غير صحيحة";
      break;
    case "auth/weak-password":
      message = "❌ كلمة المرور ضعيفة جدًا";
      break;
  }

  alert(message);
}
function goToRegister() {
  window.location.href = "register.html";
}

function resetPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("❌ من فضلك أدخل البريد الإلكتروني أولًا");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("📧 تم إرسال رابط إعادة تعيين كلمة المرور");
    })
    .catch(error => {
      handleAuthError(error);
    });
}


