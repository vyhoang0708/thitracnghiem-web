function openCity(evt, cityName) {
    // Hide all tabcontent elements
    $(".tabcontent").hide();

    // Remove the "active" class from all tablinks elements
    $(".tablinks").removeClass("active");

    // Show the selected tabcontent
    $("#" + cityName).show();

    // Add the "active" class to the clicked tablink
    $(evt.currentTarget).addClass("active");
}
$(document).ready(function () {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const token = JSON.parse(localStorage.getItem("token"))?.accessToken
    var url = 'http://localhost:8081/api/report/exams';
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
                <td>${item.luotThi}</td>         
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
    var urlSelectBox = 'http://localhost:8081/api/exam/all';
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
            $('#selectBox').append(`<option value="${item.iddt}">${item.ten}</option>`);
        });

    })
    .catch(error => {
        // Xử lý lỗi nếu có
        console.error('Đã xảy ra lỗi:', error);
    });
    $('.button').on('click', function() {
        // Get the selected value from the selectBox
        const selectedValue = $('#selectBox').val();
        // Do something with the selected value (e.g., use it for statistics)
        var urlLoad = `http://localhost:8081/api/report/score/${selectedValue}`;
        fetch(urlLoad, {
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
                <td>${item.userInfo.hoTen}</td>
                <td>${formatDate(item.ngayThi)}</td>
                <td>${item.diem}</td>         
         </tr>
   
       `
            );
            if (items.length === 0) {
                $('#loadScore').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
            } else {
                $('#loadScore').html(items);
            }


        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error('Đã xảy ra lỗi:', error);
        });
    });
});