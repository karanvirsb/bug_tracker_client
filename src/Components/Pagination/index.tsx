import React from "react";
import usePagination, { DOTS } from "../../Hooks/usePagination";

type props = {
    pageNumber: number;
    setPageNumber: any;
    hasMore: boolean;
    totalPage: number;
};

const Pagination = ({
    pageNumber,
    setPageNumber,
    hasMore,
    totalPage,
}: props) => {
    const pageRange = usePagination({
        currentPage: pageNumber,
        totalCount: totalPage,
    });

    const nextPage = () => {
        if (hasMore) {
            console.log("here next");
            setPageNumber((old: number) => Math.min(old + 1, totalPage));
        }
    };

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((old: number) => Math.max(old - 1, 1));
        }
    };

    return (
        <div className='w-full flex justify-center items-center mt-4 gap-4'>
            <button
                className='pagination-btn'
                onClick={previousPage}
                disabled={pageNumber === 1}
            >
                Prev
            </button>
            <div className='flex gap-2'>
                {pageRange.map((pageNum, index) => {
                    if (pageNum === DOTS) {
                        <span key={index}>{DOTS}</span>;
                    }
                    return (
                        <button
                            key={index}
                            aria-current={
                                pageNumber === pageNum ? "page" : "false"
                            }
                            onClick={() =>
                                setPageNumber(() => pageNum as number)
                            }
                            className='bg-secondary-color text-white w-10 h-10 text-2xl flex justify-center items-center text-center rounded-full '
                        >
                            {pageNum.toString()}
                        </button>
                    );
                })}
            </div>
            <button
                className='pagination-btn'
                onClick={nextPage}
                disabled={pageNumber === totalPage || !hasMore}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
