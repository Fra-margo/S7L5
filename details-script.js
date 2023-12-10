const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


if (productId) {

    fetch(`${apiUrl}${productId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
        },
    })
    .then(response => response.json())
    .then(data => {
        displayProductDetails(data);
    })
}

function displayProductDetails(data) {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = `
            <div id="product-${data._id}">
                <div class="card mb-5" id="card">
                    <img src="${data.imageUrl}" alt="immagineProdotto" class="card-img-top" id="img">
                    <div class="card-body">
                    <h5 class="card-title">Modello:<input type="text" id="name-${data._id}" value="${data.name}" class="form-control" readonly></h5>
                    <p class="card-text">Descrizione:<input type="text" id="description-${data._id}" value="${data.description}" class="form-control" readonly></p>
                    <p class="card-text">Marca: <input type="text" id="brand-${data._id}" value="${data.brand}" class="form-control" readonly></p>
                    <p class="card-text">Url Img: <input type="url" id="imageUrl-${data._id}" value="${data.imageUrl}" pattern="https://.*" title="Inserisci un link valido (deve iniziare con 'https://')" class="form-control" readonly></p>
                    <p class="card-text">Prezzo: <input type="number" id="price-${data._id}" value="${data.price}" class="form-control" readonly></p>
                    </div>
                </div>
            </div>`;
    }