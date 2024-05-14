export const getImagesFolder = () => {
    return `${process.cwd()}/images`
}

export const getImagesById = (id: string) => {
    if (id === "female.png" || id === "male.png" || id === "roomTypeNotFound.png"){
        return `${process.cwd()}/default/${id}`
    }
    return `${process.cwd()}/images/${id}`
}

export const dateDiff = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours());
  return Math.round((utc2 - utc1) / _MS_PER_DAY * 10) / 10;
}

