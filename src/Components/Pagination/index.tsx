import React from "react";
import usePagination, { DOTS } from "../../Hooks/usePagination";

const Pagination = (props: {
    pageNumber: number;
    setPageNumber: any;
    hasMore: boolean;
    totalPage: number;
}) => {
    const pageRange = usePagination({
        currentPage: props.pageNumber + 1,
        totalCount: props.totalPage,
    });

    const nextPage = () => {
        props.setPageNumber((old: number) => old + 1);
    };

    const previousPage = () => {
        props.setPageNumber((old: number) => Math.max(old - 1, 0));
    };

    return (
        <div className='w-full flex justify-center items-center py-4 gap-4'>
            <button
                className='pagination-btn'
                disabled={props.pageNumber === 0}
                onClick={previousPage}
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
                                props.setPageNumber((old: number) => pageNum)
                            }
                        >
                            {pageNum.toString()}
                        </button>
                    );
                })}
            </div>
            <button
                className='pagination-btn'
                disabled={
                    props.pageNumber + 1 === props.totalPage || !props.hasMore
                }
                onClick={nextPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
