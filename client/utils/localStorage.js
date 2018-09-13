export function loadCartFromLocalStorage() {
    let cart = window.localStorage.getItem('cart');
    if (cart)
        return JSON.parse(cart);
    else
        return [];
}

export function writeCartIntoLocalStorage(cart) {
    let stringifiedCart = JSON.stringify(cart);
    window.localStorage.setItem('cart', stringifiedCart);
}
