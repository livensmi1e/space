export function paginate(items, currentPage, itemsPerPage) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (clampedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = sortWritings(items).slice(startIndex, endIndex);
  return {
    paginatedItems,
    totalPages,
    currentPage: clampedPage,
  };
}

function sortWritings(writings) {
  return writings.sort((a, b) => {
    if (a.data.date != b.data.date) {
      return Date.parse(b.data.date) - Date.parse(a.data.date);
    } else {
      return (
        Date.parse(`2000-01-01 ${b.data.time}`) -
        Date.parse(`2000-01-01 ${a.data.time}`)
      );
    }
  });
}

export const ITEMS_PER_PAGE = 10;
