const form = document.getElementById("loginForm");

const users = [
    {
        username: "admin",
        password: "admin123"
    },
    {
        username: "lasya",
        password: "lasya123"
    },
    {
        username: "thrisalini",
        password: "crm123"
    }
];

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const validUser = users.find(
        user => user.username === username && user.password === password
    );

    if (validUser) {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", validUser.username);

        window.location.href = "index.html";

    } else {

        document.getElementById("error").innerText =
            "Invalid Username or Password";

    }

});