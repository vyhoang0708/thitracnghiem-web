$(document).ready(function () {
    function loadData() {
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var url = 'http://localhost:8081/api/category/all';
        fetch(url, {
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
                console.log(data);
                const items = data.map((item, index) =>
                    ` <tr>
                <td>${index + 1}</td>
                <td>${item.tenCategory}</td>
                <td id="${item.idCategory}"><i class="far fa-edit editButton"></i> 
                                    <i class="far fa-trash-alt deleteButton"></i></td>           
         </tr>
   
       `
                );
                
                if (items.length === 0) {
                    $('#loadCategory').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
                } else {
                    $('#loadCategory').html(items);
                }

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    }
    loadData();
    $('#submitAddCategory').on('click', async function () {
        const tenCategory = $("#tenCategory").val();
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        console.log(tenCategory);
        try {
            var response = await fetch("http://localhost:8081/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    tenLoai: tenCategory
                })
            });
            var kq = await response.json()
            console.log(kq);
            if (kq.status) {
                Toastify({
                    text: "Tạo mới thành công",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #259e5c, #20864e)",
                    className: "custom-toast"
                }).showToast();
                $("#myModal").modal('hide')
            } else {
                Toastify({
                    text: "Đã xãy ra lỗi! Vui lòng thử lại",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                    className: "custom-toast"
                }).showToast();
            }

        } catch (error) {
            console.error(error);
        }
    });
    $(document).on("click", ".deleteButton", async function () {
        var id = $(this).closest("td").attr("id");
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        await fetch(`http://localhost:8081/api/category/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                console.log(response.redirected);
                if (!response.redirected) {
                    Toastify({
                    text: "Xóa thành công",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #259e5c, #20864e)",
                    className: "custom-toast"
                }).showToast();
                loadData();
                }else{
                    Toastify({
                        text: "Thể loại đã có câu hỏi, Không thể xóa",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position: top, bottom, left, right
                        backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                        className: "custom-toast"
                    }).showToast();
                }
                
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi xóa dữ liệu: ", error);
                Toastify({
                    text: "Đã xãy ra lỗi! Vui lòng thử lại",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                    className: "custom-toast"
                }).showToast();
            });
    });
});