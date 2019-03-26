

function signUp(){
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('pwd').value;
  firebase.auth().createUserWithEmailAndPassword(mail, password)
  .then(function(){
    verify();
    })
  .catch(function(error) {
     
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        
        
      });
}
document.getElementById('btn-signUp').addEventListener('click', signUp);



function login(){
	const mailLogin = document.getElementById('loginMail').value;
    const passwordLogin = document.getElementById('loginPwd').value;
    observer(mail);
	firebase.auth().signInWithEmailAndPassword(mailLogin, passwordLogin).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
  
}
document.getElementById('btn-login').addEventListener('click', login);


// When the user clicks anywhere outside of the modal, close it
//creo que debemos corregir esta parte, pero no sé como

//function that checks if the user is already log
function observer () {
    firebase.auth().onAuthStateChanged(function(user) {
      //console.log(user);
        if (user) {
          console.log('Existe usuario activo');
            showValidation(user);
            
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('No existe usuario activo');
          
        }
      });
}

observer();


function close(){
  //log out
    firebase.auth().signOut();
    //clean the div that shows the button "Cerrar sesion"
    const validateUser = document.getElementById("validateUser");
    validateUser.innerHTML = "";
}

function showValidation (user){
    //creates and shows a button for logout only if user is already login
    var user = user;
    const validateUser = document.getElementById("validateUser");
    validateUser.innerHTML = "";
    validateUser.innerHTML =  `<h3>BIENVENIDO </h3>
    <p>Ya eres parte de nuestra comunidad</p>
    <button id="logOut">CERRAR SESIÓN</button>`;

    document.getElementById("logOut").addEventListener('click', close);
}

function verify(){
  //verificación de correo electrónico
  let user = firebase.auth().currentUser;
 
  user.sendEmailVerification().then(function() {
    console.log('Enviando correo')
    // Email sent.
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
 }