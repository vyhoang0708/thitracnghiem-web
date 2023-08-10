$(document).ready(function () {
    $("#formLogin").submit(async function (e) {
        let isLoggedIn = false;
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
            var kq = await response.json()
            localStorage.setItem("token", JSON.stringify(kq.data));
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
            isLoggedIn = true;
        } catch (error) {
            console.error(error);
        }
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var urlUserInfor = `http://localhost:8081/api/user/profile`;
        fetch(urlUserInfor, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                if(data.role.name === "User"){
                    window.location.href = "/Page/Exam.html"
                }else{
                    window.location.href = "/PageAdmin/index.html"
                }

                

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    });
});