let prodsArray = [];

//fetches the data from the server https://products-dasw.onrender.com and stores it in the prodsArray, it has a
//header with:
// x-expediente: 744857
// x-auth: admin

async function loadData(){
    let resp = await fetch('https://products-dasw.onrender.com/api/products',{
        method : 'GET',
        headers:{
            'x-expediente': '744857',
            'x-auth': 'admin'
        }
    })
    console.log(resp.status);
    let data = await resp.json();
    console.log(data);
    sessionStorage.setItem('products', JSON.stringify(data))
    prodsArray=data;
    showCardsData(data)
}

function showCardsData(prodsArray) {
    let html = /*html*/ `
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    ${prodsArray
        .map((prod) => /*html*/ `
        <div class="col">
            <div class="card h-100">
                <img src="${prod.imageUrl}" class="card-img-top" alt="${prod.category}">
                <div class="card-body">
                    <h5 class="card-title">${prod.name}</h5>
                    <p class="card-text">${prod.description}</p>
                    
                </div>
                <div class="card-footer">
                    <p class="card-text"><h2>$${prod.pricePerUnit}</h2></p>
                    <a href="#" class="btn btn-primary" onclick="addCart('${prod.uuid}')">Add to Cart</a>
                </div>
            </div>
        </div>
    `).join("")}`;

    document.querySelector('#product_html').innerHTML = html;
}

function addCart(uuid){
    console.log("ENTROOOOO")
    let prods = JSON.parse(sessionStorage.getItem('products'));
    let prodData = prods.find(p => p.uuid == uuid);
    console.log(prodData);

    document.getElementById('modalItemImage').src = prodData.imageUrl;
    document.getElementById('modalItemName').textContent = prodData.name;
    document.getElementById('modalItemPrice').textContent = '$' + prodData.pricePerUnit;
    document.getElementById('addCartButton').setAttribute('onclick', `confirmAdd('${prodData.uuid}')`);
    // Show the modal
    let modal = new bootstrap.Modal(document.getElementById('preCartModal'), {});
    modal.show();
}

 function confirmAdd(uuid){
    let prods = JSON.parse(sessionStorage.getItem('products'));
    let prodData = prods.find(p => p.uuid == uuid);

    amount = document.getElementById('quantity').value;
    if(amount > prodData.stock || amount <= 0){
        swal("Bad stock!", "", "error");
        return;
    }

    // Show the modal
    let modal = new bootstrap.Modal(document.getElementById('preCartModal'), {});
    modal.show();
}