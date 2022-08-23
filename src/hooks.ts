import * as React from 'react';
import {isString} from './utils';

export function useSearch<T>(
  data: T[],
  searchProperty: keyof T,
  pageSize: number
) {
  const [search, setSearch] = React.useState('');

  const filterdData = data.filter(item => {
    const lowerCaseSearch = search.toLowerCase();
    const value = item[searchProperty];
    return isString(value) && value.toLowerCase().includes(lowerCaseSearch);
  });

  const {page, setPage, pagedData} = usePagination(filterdData, pageSize);

  function handleChangeSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  const totalPages = data.length / pageSize;

  return {
    search,
    handleChangeSearch,
    page,
    setPage,
    totalPages,
    pagedData,
    total: filterdData.length,
  };
}

export function usePagination<T>(data: T[], pageSize: number) {
  const [page, setPage] = React.useState(1);
  const offset = pageSize * (page - 1);

  const pagedData = data.slice(offset, offset + pageSize);

  return {
    page,
    setPage,
    pagedData,
  };
}
