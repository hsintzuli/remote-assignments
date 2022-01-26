function ajax(src, callback) {
    // your code here
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', src);
    xhr.send();
}
function render(data) {
    // your code here
    // document.createElement() and appendChild() methods arepreferred.
    var products = JSON.parse(data);
    var statusHTML = '<table><caption>Product Lists</caption><thead><tr>';
    statusHTML += '<th>Name</th>';
    statusHTML += '<th>Price</th>';
    statusHTML += '<th>Description</th>';
    statusHTML += '</tr></thead><tbody>';
    for (let product of products) {
        statusHTML += `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.description}</td></tr>`;
    }
    statusHTML += '</tbody></table>';
    document.querySelector('.table').innerHTML = statusHTML;
}
ajax(
    'https://appworks-school.github.io/Remote-Aassigiment-Data/products'
    ,
    function (response) {
        render(response);
    }
); // you should get product information in JSON format and render data in the page