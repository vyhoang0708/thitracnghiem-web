function toggleSidebar() {
    console.log("1");
    $(".wrapper").toggleClass("collapse");
  }
$(document).ready(function () {
    
      
    var sitebar = new XMLHttpRequest();
    sitebar.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("includedSitebar").innerHTML = sitebar.responseText;
        }
    };
    sitebar.open("GET", "/Common/SiteBar.html", true);
    sitebar.send();
});