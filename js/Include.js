var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("includedContent").innerHTML = xhr.responseText;
    }
};
xhr.open("GET", "/Common/Header.html", true);
xhr.send();
