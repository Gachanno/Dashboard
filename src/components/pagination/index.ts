const getPagination = (page:number, totalPages:number) => {
    let start;
    let activeIndex;

    if (page === 1) {
        start = 1;
        activeIndex = 0;
    }
    else if (page === totalPages) {
        start = Math.max(1, totalPages - 4);
        activeIndex = (totalPages - start);
    }
    else {
        start = Math.max(1, Math.min(page - 1, totalPages - 4));
        activeIndex = page - start;
    }

    const pagesElement = Array.from({ length: totalPages < 5 ? totalPages : 5 }, (_, i) => start + i);
    return { pagesElement, activeIndex };
}

export { getPagination }