let cartArray = [];
async function loadCartData(){
    let user = sessionStorage.getItem('user')
    if(user == null){
        swal("Please log in order to cart","", "warning");
    }
    else{
        let resp = await fetch('https://products-dasw.onrender.com/api/cart',{
            method : 'GET',
            headers:{
                'x-expediente': '744857',
                'x-user': user
            }
        })
        console.log(resp.status);
        let data = await resp.json();
        console.log(data);
        console.log(data.cart);
        sessionStorage.setItem('cart', JSON.stringify(data.cart))

        cartArray = data;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    showCartData(cartArray);
});

async function showCartData(cartArray){
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    let html = /*html*/ `
    <h1>Your Cart: ${cartArray.user}</h1>
    <div class="row">
        <div class="col-md-8">
            <table class="table">
                <thead>
                <tr>
                    <th style="width: 40%;">Product</th>
                    <th style="width: 15%;">Price</th>
                    <th style="width: 35%;">Quantity</th>
                    <th style="width: 10%;"></th>
                    <th></th>
                </tr>
                </thead>
                <tbody >
    `;

    html += cart.map((c) => /*html*/ `
                <tr>
                    <td>
                        <img src="${c.product.imageUrl}" alt="${c.product.name} Image" class="item-img">
                        <label class="product-name">${c.product.name}</label>
                    </td>
                    <td>
                        <label class="price-label">${c.product.pricePerUnit}</label>
                    </td>
                    <td>
                        <label>
                            <input type="number" class="form-control quantity-input" value="${c.amount}" disabled>
                        </label>
                        <button class="btn btn-sm btn-outline-secondary edit-btn"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn btn-sm btn-outline-danger cancel-btn" style="display: none;"><i class="bi bi-x-lg"></i></button>
                        <button class="btn btn-sm btn-outline-success confirm-btn" style="display: none;"><i class="fas fa-check"></i></button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger delete-icon-btn"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
    `).join("");

    html += /*html*/ `
        </tbody>
            </table>
        </div>
    `;
    //checkout
    html += /*html*/ `
    <div class="col-md-4">
            <table class="table">
                <tbody>
                <tr>
                    <td>Total:</td>
                    <td>${cartArray.total}</td>
                </tr>
                </tbody>
            </table>
            <div class="text-end">
                <a href="#" class="btn btn-success">Checkout</a>
            </div>
        </div>
    </div>
</div>
    `

    document.querySelector('#cartTable').innerHTML = html;
    addEditButtonList();
}

function addEditButtonList(){
    const edButt = document.querySelectorAll('.edit-btn');
    edButt.forEach(function(editButton){
        editButton.addEventListener('click', function(){
            const row = this.closest('tr'); // esto para que busque el tr mas cercano
            // Muestra los botones de cancel y confirm y esconde el de edit
            row.querySelector('.cancel-btn').style.display = 'inline-block';
            row.querySelector('.confirm-btn').style.display = 'inline-block';
            row.querySelector('.edit-btn').style.display = 'none';

            // Habilita cantidad
            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.removeAttribute('disabled');
        })
        const cancelButton = editButton.nextElementSibling;
        cancelButton.addEventListener('click', function() {
            const row = this.closest('tr');

            // Cuando se preciona, vueve a su original
            row.querySelector('.cancel-btn').style.display = 'none';
            row.querySelector('.confirm-btn').style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';

            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.setAttribute('disabled', 'disabled');
        });

        //ahora lo mismo para confirmar
        const confirmButton = editButton.nextElementSibling.nextElementSibling;
        confirmButton.addEventListener('click', function() {
            const row = this.closest('tr');

            row.querySelector('.cancel-btn').style.display = 'none';
            row.querySelector('.confirm-btn').style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';

            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.setAttribute('disabled', 'disabled');
        });
    })
}

