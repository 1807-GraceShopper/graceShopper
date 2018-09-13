function ProductToken(product) {
    this.productId = product.id;
    this.price = product.price;
    this.quantity = 1;
};

ProductToken.prototype.setQuantity = (value) => {
    this.quantity = value;
}

ProductToken.prototype.incrementQuantity = () => {
    ++this.quantity;
}

ProductToken.prototype.getTotalPrice = () => {
    return this.quantity * this.price;
}

export default ProductToken;