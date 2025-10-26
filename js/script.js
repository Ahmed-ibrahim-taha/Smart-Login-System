// Selecting elements
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// Display welcome message in home page
var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

// Load users from localStorage
var signUpArray = [];
if (localStorage.getItem('users') != null) {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}

// Check if signup inputs are empty
function isEmpty() {
    if (signupName.value === "" || signupEmail.value === "" || signupPassword.value === "") {
        return false;
    } else {
        return true;
    }
}

// Check if email already exists
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// Signup function
function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML =
            '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    if (isEmailExist()) {
        document.getElementById('exist').innerHTML =
            '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }

    var signUp = {
        name: signupName.value.trim(),
        email: signupEmail.value.trim(),
        password: signupPassword.value.trim(),
    };

    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById('exist').innerHTML =
        '<span class="text-success m-3">Success</span>';
}

// ================== LOGIN ==================
function isLoginEmpty() {
    if (signinPassword.value === "" || signinEmail.value === "") {
        return false;
    } else {
        return true;
    }
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML =
            '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var password = signinPassword.value.trim();
    var email = signinEmail.value.trim();
    var found = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (
            signUpArray[i].email.toLowerCase() === email.toLowerCase() &&
            signUpArray[i].password.toLowerCase() === password.toLowerCase()
        ) {
            found = true;
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            location.replace('home.html'); // نفس المجلد
            break;
        }
    }

    if (!found) {
        document.getElementById('incorrect').innerHTML =
            '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

// Logout
function logout() {
    localStorage.removeItem('sessionUsername');
}



// Forgot Password
function forgotPassword() {
    var email = signinEmail.value.trim();
    var found = false;
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase()) {
            found = true;
            document.getElementById('forgotMsg').innerHTML =
                '<span class="text-success fs-3">Your password is:' + signUpArray[i].password + '</span>';
            break;
        }
    }
    if (!found) {
        document.getElementById('forgotMsg').innerHTML =
            '<span class="text-danger">Email not found</span>';
    }
}
