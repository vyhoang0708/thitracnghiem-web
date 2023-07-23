$(document).ready(function () {
    $("#formRegister").submit(async function (e) {
        e.preventDefault()
        const userName = $("#userName").val();
        const pass = $("#pass").val();
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const confirmPass = $("#confirmPass").val();
        if (confirmPass === pass) {
            try {
                var response = await fetch("http://localhost:8081/api/auth/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userName: userName,
                        hoTen: name,
                        email: email,
                        sdt: phone,
                        roleName: "User",
                        password: pass
                    })
                });
                var kq = await response.json()
                console.log(kq.data);
                if (kq.data.status) {
                    Toastify({
                        text: "Đăng ký thành công",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position: top, bottom, left, right
                        backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                        className: "custom-toast"
                    }).showToast();
                    window.location.href = "/Login/Login.html"
                }else{
                    Toastify({
                        text: "Đăng ký thất bại",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position: top, bottom, left, right
                        backgroundColor: "linear-gradient(to right, #00b09b, #e73535)",
                        className: "custom-toast"
                        }).showToast();
                }
            } catch (error) {
                console.error(error);
            }
        }
        else {
            Toastify({
                text: "Mật khẩu không trùng khớp",
                duration: 3000, // 3 seconds
                gravity: "top", // Position: top, bottom, left, right
                backgroundColor: "linear-gradient(to right, #00b09b, #e73535)",
                className: "custom-toast"
            }).showToast();
        }


    });
});