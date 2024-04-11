async function loadCartData(){
    let resp = await fetch('https://products-dasw.onrender.com/api/cart',{
        method : 'GET',
        headers:{
            'x-expediente': '744857',
            'x-auth': 'admin'
        }
    })

}

document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function() {
            const row = this.closest('tr'); // esto para que busque el tr mas cercano
            // Muestra los botones de cancel y confirm y esconde el de edit
            row.querySelector('.cancel-btn').style.display = 'inline-block';
            row.querySelector('.confirm-btn').style.display = 'inline-block';
            row.querySelector('.edit-btn').style.display = 'none';

            // Habilita cantidad
            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.removeAttribute('disabled');
        });

        // Agrega un event para cada boton de cancel | el nextElementSibling es para que busque el siguiente elemento
        // de la misma jerarquia
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
            const row = this.closest('tr'); // Get the parent row

            row.querySelector('.cancel-btn').style.display = 'none';
            row.querySelector('.confirm-btn').style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';

            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.setAttribute('disabled', 'disabled');
        });
    });
});

