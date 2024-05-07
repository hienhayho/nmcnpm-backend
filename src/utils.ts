export const getImagesFolder = () => {
    return `${process.cwd()}/images`
}

export const getImagesById = (id: string) => {
    if (id === "female.png" || id === "male.png"){
        return `${process.cwd()}/default/${id}`
    }
    return `${process.cwd()}/images/${id}`
}
