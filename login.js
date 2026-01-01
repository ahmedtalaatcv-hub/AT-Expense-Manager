// Firebase
const auth = firebase.auth();

/* ======================
   تسجيل الدخول فقط
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
      showError(error);
    });
}

/* ======================
   هل نسيت كلمة السر
   (مستقر وآمن)
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
        "📧 إذا كان هذا البريد مسجّل، سيتم إرسال رابط تغيير كلمة المرور"
      );
    })
    .catch(error => {
      showError(error);
    });
}

/* ======================
   الانتقال لصفحة التسجيل
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
   رسائل أخطاء واضحة
====================== */
function showError(error) {
  let msg = "❌ حدث خطأ، حاول مرة أخرى";

  switch (error.code) {
    case "auth/user-not-found":
      msg = "❌ هذا البريد غير مسجّل";
      break;
    case "auth/wrong-password":
      msg = "❌ كلمة المرور غير صحيحة";
      break;
    case "auth/invalid-email":
      msg = "❌ بريد إلكتروني غير صالح";
      break;
    case "auth/too-many-requests":
      msg = "⚠️ محاولات كثيرة، حاول لاحقًا";
      break;
  }

  alert(msg);
}
/* ======================
   إنشاء حساب جديد
====================== */
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!email || !password || !confirmPassword) {
    alert("❌ من فضلك املأ جميع الحقول");
    return;
  }

  if (password.length < 6) {
    alert("❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ كلمتا المرور غير متطابقتين");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ تم إنشاء الحساب بنجاح");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("❌ " + error.message);
    });
}

/* ======================
   إظهار / إخفاء كلمة المرور
====================== */
function togglePassword() {
  const pass = document.getElementById("password");
  const confirm = document.getElementById("confirmPassword");

  const type = pass.type === "password" ? "text" : "password";
  pass.type = type;
  confirm.type = type;
}


