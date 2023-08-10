$(document).ready(function () {
    $("#resetPass").submit(async function (e) {
        e.preventDefault()
        const password = $("#password").val();
        const ConfirmPass = $("#ConfirmPass").val();
        console.log(password);
        if (password !== ConfirmPass) {
            // Mật khẩu và mật khẩu xác nhận không khớp
            alert("Mật khẩu và mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
            return; // Dừng việc gửi form nếu mật khẩu không khớp
        }else{
            var urlParams = new URLSearchParams(window.location.search);
            let idFromURL = urlParams.get('verify-code');
            console.log(idFromURL);
            try {
                var response = await fetch("http://localhost:8081/api/auth/user/reset-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        verifyCode: idFromURL,
                        password: password
                    })
                });
                var kq = await response.json()
                if (kq.data.status) {
                    Toastify({
                        text: "Đăng nhập thành công",
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
            } catch (error) {
                console.error(error);
            }
        }
    });
});