import React, { useCallback, useMemo } from "react";
import usePagination, { DOTS } from "../../Hooks/usePagination";

const Pagination = (props: {
    pageNumber: number;
    setPageNumber: any;
    hasMore: boolean;
    hasPrevious: boolean;
    totalPage: number;
}) => {
    const pageRange = usePagination({
        currentPage: props.pageNumber + 1,
        totalCount: props.totalPage,
    });

    const nextPage = () => {
        if (props.hasMore && props.pageNumber < props.totalPage) {
            console.log("here next");
            props.setPageNumber((old: number) => old + 1);
        }
    };

    const previousPage = () => {
        if (props.pageNumber !== 0 && props.hasPrevious) {
            console.log("here prev");
            props.setPageNumber((old: number) => Math.max(old - 1, 0));
        }
    };

    return (
        <div className='w-full flex justify-center items-center py-4 gap-4'>
            <button
                className='pagination-btn'
                onClick={previousPage}
                disabled={props.pageNumber === 0}
            >
                Prev
            </button>
            <div>
                {pageRange.map((pageNum) => {
                    if (pageNum === DOTS) {
                        <span>{DOTS}</span>;
                    }
                    return (
                        <button
                            aria-current={
                                props.pageNumber + 1 === pageNum
                                    ? "page"
                                    : "false"
                            }
                            onClick={() =>
                                props.setPageNumber(
                                    (old: number) => (pageNum as number) - 1
                                )
                            }
                        >
                            {pageNum.toString()}
                        </button>
                    );
                })}
            </div>
            <button
                className='pagination-btn'
                onClick={nextPage}
                disabled={
                    props.pageNumber === props.totalPage || !props.hasMore
                }
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
