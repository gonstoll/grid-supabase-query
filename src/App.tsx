import * as React from 'react';
import {useItemsQuery} from './api/hooks';
import {PER_PAGE} from './definitions';
import {useSearch} from './hooks';
import * as styled from './styled';

export default function App() {
  const {data: itemsData, isLoading} = useItemsQuery();
  const {search, handleChangeSearch, pagedData, page, setPage, totalPages} =
    useSearch(itemsData || [], 'title', PER_PAGE);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChangeSearch(event.currentTarget.value);
  }

  function handlePagination(mode: 'prev' | 'next') {
    if (!itemsData) return;
    if (mode === 'prev' && page > 1) {
      setPage(page - 1);
    }
    if (mode === 'next' && page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <styled.Container>
      <styled.Input
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Search items"
      />
      {!pagedData?.length && !isLoading ? <p>No results...</p> : null}
      <styled.Grid>
        {pagedData?.map(item => (
          <styled.GridItem key={item.id}>
            <styled.GridImage>
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
            </styled.GridImage>
            <styled.GridDescription>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </styled.GridDescription>
          </styled.GridItem>
        ))}
      </styled.Grid>
      <styled.ButtonsWrapper>
        <styled.Button
          isDisabled={page <= 1}
          onClick={() => handlePagination('prev')}
        >
          Previous page
        </styled.Button>
        <styled.Button
          isDisabled={page >= totalPages}
          onClick={() => handlePagination('next')}
        >
          Next page
        </styled.Button>
      </styled.ButtonsWrapper>
    </styled.Container>
  );
}
