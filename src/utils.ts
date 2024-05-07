export const getImagesFolder = () => {
    return `${process.cwd()}/${process.env.IMG_DEST}`
}

export const getImagesById = (id: string) => {
    return `${process.cwd()}/${process.env.IMG_DEST}/${id}`
}
