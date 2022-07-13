import { useMemo } from "react";

export const DOTS = "...";

type props = {
    currentPage: number;
    totalCount: number;
};

function usePagination({ currentPage, totalCount }: props) {
    /*
    * This hook will return pagination of blogs with always displaying the first and last page. 

    * currentPage - the page that the user is on
    * totalCount - is the total amount of pages
    
  */

    const FIRST_PAGE = 1;

    const LAST_PAGE = totalCount;

    const pages = useMemo(() => {
        return getPages(FIRST_PAGE, LAST_PAGE, currentPage);
    }, [FIRST_PAGE, LAST_PAGE, currentPage]);

    return pages;
}

function getPages(FIRST_PAGE: number, LAST_PAGE: number, currentPage: number) {
    let pages = [];

    if (FIRST_PAGE === LAST_PAGE || FIRST_PAGE > LAST_PAGE) {
        pages = [FIRST_PAGE];
    } else if (LAST_PAGE === 2) {
        pages = [FIRST_PAGE, LAST_PAGE];
    } else if (LAST_PAGE === 3) {
        pages = [FIRST_PAGE, FIRST_PAGE + 1, LAST_PAGE];
    } else if (currentPage === FIRST_PAGE || currentPage - 1 === FIRST_PAGE) {
        // checks to see if currentPage is the first page or is the second page
        pages = [FIRST_PAGE, 2, 3, DOTS, LAST_PAGE];
    } else if (currentPage + 1 === LAST_PAGE) {
        //if current page is the second last page
        pages = [FIRST_PAGE, DOTS, currentPage - 1, currentPage, LAST_PAGE];
    } else if (currentPage === LAST_PAGE) {
        pages = [FIRST_PAGE, DOTS, currentPage - 2, currentPage - 1, LAST_PAGE];
    } else {
        // else if its the third page make it in the middle
        pages = [
            FIRST_PAGE,
            DOTS,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            DOTS,
            LAST_PAGE,
        ];
    }
    return pages;
}

export default usePagination;
