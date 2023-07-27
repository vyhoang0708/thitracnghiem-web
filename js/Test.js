$(document).ready(function () {
  function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    let hours, minutes, seconds;

    const countdownInterval = setInterval(function() {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      $('#countdown').text(formattedTime);

      if (--timer < 0) {
        clearInterval(countdownInterval);
        $('#countdown').text('00:00:00'); // Khi hết thời gian, hiển thị giá trị cuối cùng là "00:00:00"
        // Thực hiện hành động khi đếm ngược kết thúc (nếu cần)
      }
    }, 1000); // Cập nhật giá trị đồng hồ sau mỗi giây (1000ms)
  }
  $('#question').on('change', 'input[type="radio"]', function() {
    const inputName = $(this).attr('name');
    console.log('Input Name:', inputName);
    $('#listBlock .block').each(function() {
      // Kiểm tra nếu giá trị của thẻ là "a", thêm class "selected"
      if ($(this).text().trim() === inputName) {
        $(this).addClass('selected');
      }
    });
  });
    var urlParams = new URLSearchParams(window.location.search);
    var idFromURL = urlParams.get('id');
    const token = JSON.parse(localStorage.getItem("token"))?.accessToken
    var urlExam = `http://localhost:8081/api/exam/${idFromURL}`;
    fetch(urlExam, {
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
        $("#nameExam").text("Đề thi: "+ data.tenDT);
        console.log(data.thoiGian *60)
          // Gọi hàm startCountdown với thời gian đếm ngược (trong giây)
        startCountdown(data.thoiGian *60); // Đếm ngược 1 giờ (3600 giây)
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    });
    var urlExamDetail = `http://localhost:8081/api/examDetail/${idFromURL}`;
    fetch(urlExamDetail, {
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

      const items = data.map((item, index) =>
      `<div>
        <h4><br>Câu ${index + 1}:</h4>
        <p>${item.question.noiDung}</p>
        ${
          item.question?.answers
            ? `<form>
                ${item.question.answers.map((i) => `
                  <input type="radio" id="${i.idAnswer}" name="${index+1}" value="${i.dapAn}">
                  <label for="${i.idAnswer}">${i.dapAn}</label><br>`).join('')
              }</form>`
            : ''
        }
      </div>`
    );  
       $('#question').html(items);
       const block = data.map((item, index)=>`
       <div class="block">${index+1}</div>
       `);
       $('#listBlock').html(block);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    });
    $('#uncheckAllBtn').on('click', function() {
      $('input[type="radio"]').prop('checked', false);
    });
  });  