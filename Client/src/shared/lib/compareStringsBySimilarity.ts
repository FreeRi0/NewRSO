export const compareStringsBySimilarity = (
    a: string,
    b: string,
    reference: string,
) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    if (aLower.startsWith(reference) && !bLower.startsWith(reference)) {
        return -1;
    }
    if (!aLower.startsWith(reference) && bLower.startsWith(reference)) {
        return 1;
    }
    return aLower.indexOf(reference) - bLower.indexOf(reference);
};
