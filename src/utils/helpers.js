
export const decodeOpenCatalogName = (name) => {
    return name.split('_')[1].replace(/[-]/g, ' ').toUpperCase()
}