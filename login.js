const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("https://future-fs-02-wlb7.onrender.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", data.user.username);

            window.location.href = "index.html";

        } else {

            document.getElementById("error").innerText = data.message;

        }

    } catch (err) {

        document.getElementById("error").innerText =
            "Unable to connect to server.";

    }

});