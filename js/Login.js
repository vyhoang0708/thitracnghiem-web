$(document).ready(function () {
    $("#formLogin").submit(async function (e) {
        e.preventDefault()
        const userName = $("#username").val();
        const pass = $("#password").val();
        console.log(userName + pass)
        try {
            var response = await fetch("http://localhost:8081/api/auth/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userName,
                    password: pass
                })
            });
            var kq =await response.json()
            localStorage.setItem("token", JSON.stringify(kq.data));
            if(kq.data.status){
                Toastify({
                text: "Đăng nhập thành công",
                duration: 3000, // 3 seconds
                gravity: "top", // Position: top, bottom, left, right
                backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                className: "custom-toast"
                }).showToast();
                window.location.href="/Page/Exam.html"
            }else{
                Toastify({
                    text: "Đăng nhập thất bại",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #00b09b, #e73535)",
                    className: "custom-toast"
                    }).showToast();
            }
        } catch (error) {
            console.error(error);
        }
    });
});