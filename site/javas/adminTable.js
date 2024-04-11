function showProductAdminTable(){
    let prods = JSON.parse(sessionStorage.getItem('products'));
    console.log(prods);
    //gets all the keys from products
    let keys = Object.keys(prods[0]);
    console.log(keys);
}