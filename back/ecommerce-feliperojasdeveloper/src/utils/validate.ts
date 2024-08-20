export function validateUser(user: any): boolean {
    const validUser = user.name !== undefined && user.email !== undefined && user.password !== undefined && user.address !== undefined && user.phone !== undefined && user.country !== undefined && user.city !== undefined;
    return validUser;
}

export function validateProduct(product: any): boolean {
    const validProduct = product.name !== undefined && product.description !== undefined && product.price !== undefined && product.stock !== undefined && product.imgUrl !== undefined;

    return validProduct;
}