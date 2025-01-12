module.exports = (objectPagination, query, countProducts) => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    // get number of pages
    const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}