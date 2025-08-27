export function formatCurrency(amount:number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

// Al tener imagenes en local y en cloudinary, verificamos el path para asi poderla llamar correctamente
export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)) { // La obtenemos desde el servidor
        return imagePath
    } else { // Lo obtenemos desde la carpeta local
        return `/products/${imagePath}.jpg`
    }
}