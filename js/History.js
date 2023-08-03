$(document).ready(function () {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const token = JSON.parse(localStorage.getItem("token"))?.accessToken
  var url = `http://localhost:8081/api/test/user`;
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

      const items = data.map((item) =>
        ` <tr>
                <td>${formatDate(item.ngayThi)}</td>
                <td>${item.exam.tenDT}</td>
                <td>${item.diem}</td> 
                <td><i class="far fa-edit"></i></td>           
            </tr>
           
               `
      );

      if (items.length === 0) {
        $('#history').html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
      } else {
        $('#history').html(items);
      }

    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    });
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
  
        console.log(data)
        $('#name').text(data.userInfo.hoTen);
        $('#SDT').text("SDT: " + data.userInfo.sdt);
        $('#email').text("Email: " + data.userInfo.account.email);
  
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error('Đã xảy ra lỗi:', error);
      });  
});  