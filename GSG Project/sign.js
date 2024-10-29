
const showPasswordCheckbox = document.getElementById('show-password');
const passwordField = document.getElementById('password');

showPasswordCheckbox.addEventListener('change', function() {
    if (showPasswordCheckbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const correctEmail = "admin@gmail.com";
    const correctPassword = "123";


    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    if (email === correctEmail && password === correctPassword) {
        
        window.location.href = "index.html";
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
});
