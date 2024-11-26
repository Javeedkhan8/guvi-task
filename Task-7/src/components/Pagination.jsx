import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, pageSize = 5 }) {
    const maxPages = Math.ceil(totalPages / pageSize); // Number of page groups (pageSize controls how many pages are shown at a time)

    // Determine the current group of pages to display
    const currentGroup = Math.floor((currentPage - 1) / pageSize);
    const startPage = currentGroup * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const handlePrevGroup = () => {
        if (currentGroup > 0) {
            onPageChange((currentGroup - 1) * pageSize + 1);
        }
    };

    const handleNextGroup = () => {
        if (currentGroup < maxPages - 1) {
            onPageChange((currentGroup + 1) * pageSize + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                onClick={handlePrevGroup}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                disabled={currentGroup === 0}
            >
                {'<'}
            </button>
            
            {/* Display pages */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-4 py-2 rounded ${currentPage === page ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                >
                    {page}
                </button>
            ))}
            
            <button
                onClick={handleNextGroup}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                disabled={currentGroup === maxPages - 1}
            >
                {'>'}
            </button>
        </div>
    );
}

export default Pagination;
