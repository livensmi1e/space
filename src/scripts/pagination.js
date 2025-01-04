export function paginate(items, currentPage, itemsPerPage) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);
    const startIndex = (clampedPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    return {
        paginatedItems,
        totalPages,
        currentPage: clampedPage,
    };
}

export const ITEMS_PER_PAGE = 2;
