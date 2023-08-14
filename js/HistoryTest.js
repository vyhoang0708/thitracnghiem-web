$(document).ready(function () {
    const token = JSON.parse(localStorage.getItem("token"))?.accessToken
    var urlParams = new URLSearchParams(window.location.search);
    let idFromURL = urlParams.get('id');
    console.log(idFromURL);
    var urlExam = `http://localhost:8081/api/test/${idFromURL}`;
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
       $("#nameExam").text("Đề thi: " + data[0].test.exam.tenDT);
      console.log(data[0].test);
      const items = data.map((item, index) =>
        `<div>
        <h4><br>Câu ${index + 1}:</h4>
        <p>${item.question.noiDung}</p>
        ${item.question?.answers
          ? `<form>
                ${item.question.answers.map((i) => `
                  <input type="radio" id="${i.idAnswer}" idBlock="${index + 1}" value="${i.dapAn}" ${i.idAnswer === item.answer.idAnswer ? 'checked' : ''}>
                  <label  class="${i.true?"answerTrue":null}" for="${i.idAnswer}">${i.dapAn}</label><br>`).join('')
          }</form>`
          : ''
        }
      </div>`
      );
      $('#question').html(items);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    });
});