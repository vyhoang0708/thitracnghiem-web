let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = $(".mySlides");
    let dots = $(".dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function myFunction(e) {
  window.location.href = "Test.html?id=" + e;
}
$(document).ready(function () {
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
        var itemList = $('#listExam');
        const items = data.map((item) =>
           `<div class="col itemExam ">
            <div class="none">${item.iddt}</div>
            <div>Đề thi: ${item.ten}</div>
            <div>Số câu: ${item.soluong}</div>
            <div>Thời gian: ${item.thoi_Gian}p</div>
            <button class="button " id="${item.iddt}" onclick="myFunction(${item.iddt})">Thi ngay</button>
               `
            );
         $('#listExam').html(items);
        
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    });
  });  