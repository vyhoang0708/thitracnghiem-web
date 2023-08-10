$(document).ready(function () {
    $("#submitEmail").submit(async function (e) {
        e.preventDefault()
        const email = $("#email").val();
        console.log(email);
        try {
            var response = await fetch("http://localhost:8081/api/auth/user/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });
            var kq = await response.json()
            console.log(kq.data.status);
            if (kq.data.status) {
                Toastify({
                    text: "Gửi mail thành công",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #259e5c, #20864e)",
                    className: "custom-toast"
                }).showToast();
                
            } else {
                Toastify({
                    text: kq.data.message,
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #00b09b, #e73535)",
                    className: "custom-toast"
                }).showToast();
            }
            isLoggedIn = true;
        } catch (error) {
            console.error(error);
        }
    });
});