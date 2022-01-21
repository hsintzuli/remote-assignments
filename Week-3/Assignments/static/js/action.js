const inputForm = document.getElementById("form");
inputForm.addEventListener('submit', makeRequest);

function makeRequest() {
    var httpRequest = new XMLHttpRequest();
    var number =  document.getElementById("number").value;
    const url = `/data?number=${number}`;
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
      
    httpRequest.onreadystatechange = displayAnswer;
    httpRequest.open('GET', url);
    httpRequest.send();

    function displayAnswer() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var el = document.createElement( 'html' );
                el.innerHTML = httpRequest.responseText;
                const answer = el.getElementsByTagName( 'u' )[0].innerHTML;
                alert(`Answer: ${answer}`);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}


