// Firebase
const auth = firebase.auth();
const db = firebase.firestore();

/* ======================
   تسجيل الدخول
====================== */
function login() {
  const email = getEmail();
  const password = getPassword();

  if (!email || !password) {
    alert("❌ من فضلك أدخل البريد الإلكتروني وكلمة المرور");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      handleError(error);
    });
}

/* ======================
   إنشاء حساب جديد
====================== */
function register() {
  const email = getEmail();
  const password = getPassword();

  if (!email || !password) {
    alert("❌ من فضلك أدخل البريد الإلكتروني وكلمة المرور");
    return;
  }

  if (password.length < 6) {
    alert("❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // إنشاء مستخدم في Firestore
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
      handleError(error);
    });
}

/* ======================
   هل نسيت كلمة السر (آمن)
====================== */
function resetPassword() {
  const email = getEmail();

  if (!email) {
    alert("❌ من فضلك أدخل البريد الإلكتروني أولًا");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert(
        "📧 إذا كان البريد مسجّل لدينا، سيتم إرسال رابط إعادة تعيين كلمة المرور"
      );
    })
    .catch(error => {
      handleError(error);
    });
}

/* ======================
   تسجيل الخروج
====================== */
function logout() {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}

/* ======================
   الانتقال لصفحة إنشاء حساب
====================== */
function goToRegister() {
  window.location.href = "register.html";
}

/* ======================
   أدوات مساعدة
====================== */
function getEmail() {
  const el = document.getElementById("email");
  return el ? el.value.trim() : "";
}

function getPassword() {
  const el = document.getElementById("password");
  return el ? el.value.trim() : "";
}

/* ======================
   معالجة الأخطاء
====================== */
function handleError(error) {
  let msg = "❌ حدث خطأ غير متوقع";

  switch (error.code) {
    case "auth/user-not-found":
      msg = "❌ لا يوجد حساب بهذا البريد";
      break;
    case "auth/wrong-password":
      msg = "❌ كلمة المرور غير صحيحة";
      break;
    case "auth/email-already-in-use":
      msg = "❌ البريد مستخدم بالفعل";
      break;
    case "auth/invalid-email":
      msg = "❌ بريد إلكتروني غير صالح";
      break;
    case "auth/weak-password":
      msg = "❌ كلمة المرور ضعيفة";
      break;
  }

  alert(msg);
}
