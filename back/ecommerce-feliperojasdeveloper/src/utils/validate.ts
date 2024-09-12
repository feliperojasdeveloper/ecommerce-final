export function validateUser(user: any): boolean {
    const validUser =
        user.name !== undefined &&
        user.email !== undefined &&
        user.password !== undefined &&
        user.address !== undefined &&
        user.phone !== undefined &&
        user.country !== undefined &&
        user.city !== undefined;

    const areStringsValid = [user.name, user.email, user.password, user.address, user.country, user.city].every((field) => typeof field === 'string' && field.trim().length > 0);
    const isPhoneValid = typeof user.phone === 'number' && user.phone > 0;
    return validUser && areStringsValid && isPhoneValid;
}

export function validateProduct(product: any): boolean {
    const validProduct = product.name !== undefined && product.description !== undefined && product.price !== undefined && product.stock !== undefined && product.imgUrl !== undefined;

    return validProduct;
}