export const getImagesFolder = () => {
    return `${process.cwd()}/images`
}

export const getImagesById = (id: string) => {
    return `${process.cwd()}/images/${id}`
}
