const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const loadingIndicator = document.getElementById("loadingIndicator");
const progressBar = document.getElementById("progressBar");
const progressBarFill = document.getElementById("progressBarFill");

async function fetchData() {
    try {
        progressBar.style.display = "block";

        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
            }
        });

        if (!response.ok) {
            throw new Error(`Errore durante la richiesta: ${response.status}`);
        }

        const data = await response.json();
        progressBar.style.display = "none";

        data.forEach(data => {
            displayProductOnHomepage(data);
        });
    } catch (error) {
        console.error("Errore durante il caricamento delle risorse:", error);
        progressBar.style.display = "none";
    }
}

fetchData()

function displayProductOnHomepage(data) {
    document.getElementById("tabcontainer").innerHTML+=`
    <div class="col-md-4 d-flex" id="product-${data._id}">
         <div class="card mb-4">
           <img src="${data.imageUrl}" alt="immagineProdotto" class="card-img-top" style="width:100%">  
           <div class="card-body">
             <h5 class="card-title">Modello:<input type="text" id="name-${data._id}" value="${data.name}" class="form-control" readonly></h5>
             <p class="card-text">Descrizione:<input type="text" id="description-${data._id}" value="${data.description}" class="form-control" readonly></p>
             <p class="card-text">Marca: <input type="text" id="brand-${data._id}" value="${data.brand}" class="form-control" readonly></p>
             <p class="card-text">Url Img: <input type="url" id="imageUrl-${data._id}" value="${data.imageUrl}" pattern="https://.*" title="Inserisci un link valido (deve iniziare con 'https://')" class="form-control" readonly></p>
             <p class="card-text">Prezzo: <input type="number" id="price-${data._id}" value="${data.price}" class="form-control" readonly></p>
            <div class="d-flex justify-content-between align-items-end">
              <button onclick='toggleInput(); toggleEditDeleteButtons()' type="button" class="btn btn-sm btn-outline-primary">
                Modifica Prodotto
              </button>
              <button onclick='editProduct("${data._id}"); toggleInput(); toggleEditDeleteButtons()' type="button" class="btn btn-sm btn-outline-primary edit-delete-buttons">
                Salva Modifiche
              </button>
              <button onclick='redirectToDetails("${data._id}")' type="button" class="btn btn-sm btn-outline-primary">
                Scopri di più
              </button>
            </div>
        </div>
      </div>
    </div>`
}

function redirectToDetails(productId) {
    window.location.href = `../details.html?id=${productId}`;
}

function toggleInput(){
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"], input[type="number"]');
    for (const input of inputs) {
        input.readOnly = !input.readOnly;
    }
}

function toggleEditDeleteButtons(){
    const buttons = document.getElementsByClassName("edit-delete-buttons");
    for (const button of buttons) {
        if (button.style.display === "none" || button.style.display === "") {
            button.style.display = "inline-block";
        } else {
            button.style.display = "none";
        }
    }
}

function editProduct(id){
    const updatedProductData = {
        "name": document.getElementById(`name-${id}`).value,
        "description": document.getElementById(`description-${id}`).value,
        "brand": document.getElementById(`brand-${id}`).value,
        "imageUrl": document.getElementById(`imageUrl-${id}`).value,
        "price": document.getElementById(`price-${id}`).value,
    };
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
        },
        body: JSON.stringify(updatedProductData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
}