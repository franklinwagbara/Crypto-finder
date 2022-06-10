import React, { useState, useEffect } from "react";

const usePagination = ({ items, pageSize = 10 }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState([]);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const lastIndex = startIndex + pageSize;

    setPage((prev) => items.slice(startIndex, lastIndex));
  }, [items, pageNumber, pageSize]);

  return [page, pageNumber, setPageNumber];
};
export default usePagination;
