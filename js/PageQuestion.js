$(document).ready(function () {
 
    function loadData() {
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
                <td>${item.mucDo}</td> 
                <td id="${item.idCH}"><i class="far fa-plus-square answerButton"></i> 
                                    <i class="far fa-edit editButton"></i> 
                                    <i class="far fa-trash-alt deleteButton"></i></td>           
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
    }
    loadData();
    $(document).on("click", ".deleteButton", async function () {
        var id = $(this).closest("td").attr("id");
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        await fetch(`http://localhost:8081/api/question/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                console.log(response);
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
                        text: "Câu hỏi đã được thêm vào đề thi, Không thể xóa",
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
    $(document).on("click", ".answerButton", async function () {

        $("#myModal").modal('show');
        var id = $(this).closest("td").attr("id");
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var urlAnswer = `http://localhost:8081/api/question/getAnswer/${id}`;
        fetch(urlAnswer, {
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
                <td>${item.dapAn}</td>
                <td>${item.true}</td>          
         </tr>
   
       `
                );

                if (items.length === 0) {
                    $('#loadAnswer').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
                } else {
                    $('#loadAnswer').html(items);
                }

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    });
    $(".button").click(function () {
        $("#myModalAdd").modal('show');
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var urlSelectBox = 'http://localhost:8081/api/category/all';
        fetch(urlSelectBox, {
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
                data.forEach(function (item) {
                    $('#selectBox').append(`<option value="${item.tenCategory}">${item.tenCategory}</option>`);
                });

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Đã xảy ra lỗi:', error);
            });
    });
    $(document).on("click", ".add", async function () {
        var row = '<tr>' +
            '<td><input type="text" placeholder="Nội dung đáp án" class="dapAn" style="width: 100%; height: 100%;" required></td>' +
            '<td><input type="checkbox" class="singleCheckbox"></td>' +
            '</tr>';

        $('#answer').append(row); // Add the new row to the table body
        $('.singleCheckbox').off('click').on('click', function () {
            $('.singleCheckbox').not(this).prop('checked', false);
        });
    });
    $('#submitCreateQuestion').on('click', async function () {
        const selectedValue = $('#selectBox').val();
        const question = $("#question").val();
        const MD = $("#MD").val();
        var rowData = [];
        $('.singleCheckbox').each(function () {
            var checkbox = $(this);
            var row = checkbox.closest('tr');
            var data = {
                dapAn: row.find('.dapAn').val(),
                true: checkbox.prop('checked')
            };
            rowData.push(data);

        });
        const token = JSON.parse(localStorage.getItem("token"))?.accessToken
        var response = await fetch("http://localhost:8081/api/question/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                noiDung: question,
                mucDo: MD,
                category: selectedValue,
                anserList: rowData
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
            $("#myModalAdd").modal('hide')
            loadData()
        } else {
            Toastify({
                text: "Đã xãy ra lỗi! Vui lòng thử lại",
                duration: 3000, // 3 seconds
                gravity: "top", // Position: top, bottom, left, right
                backgroundColor: "linear-gradient(to right, #eb6a6a, #eb6a6a)",
                className: "custom-toast"
            }).showToast();
        }
    });
});