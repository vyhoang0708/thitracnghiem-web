$(document).ready(function () {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function loadData() {
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var url = 'http://localhost:8081/api/exam/all';
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
                <td>${item.ten}</td>
                <td>${formatDate(item.ngay_tao)}</td>
                <td>${item.thoi_Gian}</td> 
                <td>${item.soluong}</td> 
                <td id="${item.iddt}"><i class="far fa-plus-square addButton"></i> 
                                    <i class="far fa-edit editButton"></i> 
                                    <i class="far fa-trash-alt deleteButton"></i></td>           
         </tr>
   
       `
                );
                if (items.length === 0) {
                    $('#loadExam').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
                } else {
                    $('#loadExam').html(items);
                }

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    }
    loadData();
    $(".button").click(function () {
        $("#myModal").modal('show');
    });
    $('#submitAddExem').on('click', async function () {
        const tenDT = $("#tenDT").val();
        const cauHoi = $("#cauHoi").val();
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        console.log(token);
        try {
            var response = await fetch("http://localhost:8081/api/exam/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    tenDT: tenDT,
                    thoiGian: cauHoi
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
        var confirmation = confirm("Xác nhận xóa đề thi");
        if (confirmation) {
            var id = $(this).closest("td").attr("id");
        console.log("Id được lấy từ nút xóa: " + id);
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        await fetch(`http://localhost:8081/api/exam/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (!response.redirected) {
                    Toastify({
                    text: "Xóa thành công",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #259e5c, #20864e)",
                    className: "custom-toast"
                }).showToast();
                loadData();
                }
                else{
                    Toastify({
                        text: "Đề thi đã có User làm bài, Không thể xóa",
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
        }
        
    });
    $(document).on("click", ".addButton", async function () {
        $("#modalAddQuestion").modal('show');
        var id = $(this).closest("td").attr("id");
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var url = 'http://localhost:8081/api/question/all';
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
                <td>${item.category.tenCategory}</td>
                <td>${item.noiDung}</td> 
                <td id="${item.idCH}" name="${id}"><input type="checkbox"></td>           
         </tr>
   
       `
                );
                if (items.length === 0) {
                    $('#loadQuestion').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
                } else {
                    $('#loadQuestion').html(items);
                }

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    });
    async function addQuestion() {
        const checkedIDs = [];
        var dt;
        $('#loadQuestion input[type="checkbox"]').each(function () {

            if ($(this).is(':checked')) {
                dt = $(this).parent().attr('name');
                // If the checkbox is checked, get the ID from the parent <td> element and push it to the array
                checkedIDs.push({
                    idCH: $(this).parent().attr('id')
                });
            }
        });
        console.log(checkedIDs);
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        try {
            var response = await fetch("http://localhost:8081/api/examDetail/addQuestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    idExam: dt,
                    addQuestionRequests: checkedIDs
                })
            });
            var kq = await response.json()
            console.log(kq);
            if (kq.status) {
                
                Toastify({
                    text: "Thêm thành công",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position: top, bottom, left, right
                    backgroundColor: "linear-gradient(to right, #259e5c, #20864e)",
                    className: "custom-toast"
                }).showToast();
                $("#modalAddQuestion").modal('hide')
                loadData();
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
    }
    $('#submitAddQuestion').on('click', async function () {

        addQuestion();
    });
});  