const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

document.getElementById("addButton").addEventListener("click", function() {
    addProduct();
})

fetch(apiUrl, {
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
    }
})
.then(response => response.json())
.then(data => {
    data.forEach(product => {
        listaProdotti(product)
    });
    console.log(data);
})

function addProduct(){
    const productData = popolaProdotti();

    if (Object.values(productData).every(value => value !== "" && value !== null && value !== undefined)) {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
            },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                listaProdotti(productData);
            });
    } else {
        alert("Completa tutti i campi prima di inserire il prodotto.");
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

function deleteProduct(id) {
    if (confirm("Sei sicuro di voler cancellare questo prodotto?")){
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDc4ZGZlMDMxZTAwMTliYTE1MWIiLCJpYXQiOjE3MDIwMzczODksImV4cCI6MTcwMzI0Njk4OX0.BJCu9c8OyULNyJzgwVGZ-Ct74J25lWzlrgHNPS9mqls",
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const productElement = document.getElementById(`product-${id}`);
            if (productElement) {
                productElement.remove();
            }
        })
    }
}

function listaProdotti(data){
    document.getElementById("tabcontainer").innerHTML+=`
       <div class="col-md-4 d-flex" id="product-${data._id}">
         <div class="card mb-4">
           <img src="${data.imageUrl}" alt="immagineProdotto" class="card-img-top">  
           <div class="card-body">
             <h5 class="card-title">Modello:<input type="text" id="name-${data._id}" value="${data.name}" class="form-control" readonly></h5>
             <p class="card-text">Descrizione:<input type="text" id="description-${data._id}" value="${data.description}" class="form-control" readonly></p>
             <p class="card-text">Marca: <input type="text" id="brand-${data._id}" value="${data.brand}" class="form-control" readonly></p>
             <p class="card-text">Url Img: <input type="url" id="imageUrl-${data._id}" value="${data.imageUrl}" pattern="https://.*" title="Inserisci un link valido (deve iniziare con 'https://')" class="form-control" readonly></p>
             <p class="card-text">Prezzo: <input type="number" id="price-${data._id}" value="${data.price}" class="form-control" readonly></p>
             <div class="d-flex justify-content-end">
               <div class="btn-group">
                 <button onclick='editProduct("${data._id}")' type="button" class="btn btn-sm btn-outline-primary edit-delete-buttons">
                   Modifica Prodotto
                 </button>
                 <button onclick='deleteProduct("${data._id}")' type="button" class="btn btn-sm btn-outline-primary edit-delete-buttons">
                   Cancella Prodotto
                 </button>

               </div>
             </div>
           </div>
         </div>
       </div>`
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
    const buttonText = document.getElementById("setModifica");
    buttonText.textContent = buttonText.textContent === "Modifica" ? "Non Modificare" : "Modifica";

    const inputs = document.querySelectorAll('input[type="text"], input[type="url"], input[type="number"]');
    for (const input of inputs) {
        input.readOnly = !input.readOnly;
    }
}

function popolaProdotti(){
    return {
        "name" : document.getElementById("name").value,
        "description" : document.getElementById("description").value,
        "brand" : document.getElementById("brand").value,
        "imageUrl" : document.getElementById("imageUrl").value,
        "price" : document.getElementById("price").value,
    }
}

function resetForm() {
    if (confirm("Sei sicuro di voler resettare il form?")) {
        document.getElementById("myForm").reset();
    }
}
