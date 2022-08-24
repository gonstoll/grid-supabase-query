import * as React from 'react';
import {useItemsMutation, useItemsQuery} from './api/hooks';
import {PER_PAGE} from './definitions';
import {useSearch} from './hooks';
import * as styled from './styled';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
  imageUrl: HTMLInputElement;
}

export default function App() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const {data: itemsData, isLoading} = useItemsQuery();
  const {persistItems} = useItemsMutation();

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const elements = formRef.current?.elements as FormElements;
    persistItems(
      [
        {
          title: elements.title.value,
          description: elements.description.value,
          imageUrl: elements.imageUrl.value,
        },
      ],
      {
        onSuccess: () => formRef.current?.reset(),
      }
    );
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

      <styled.Form onSubmit={handleSubmit} ref={formRef}>
        <h3>Create a new item</h3>
        <label htmlFor="title">
          Title
          <styled.Input type="text" name="title" id="title" />
        </label>
        <label htmlFor="description">
          Description
          <styled.Input type="text" name="description" id="description" />
        </label>
        <label htmlFor="imageUrl">
          Image url
          <styled.Input type="text" name="imageUrl" id="imageUrl" />
        </label>

        <styled.Button type="submit">Submit</styled.Button>
      </styled.Form>

      {!pagedData?.length && !isLoading ? <p>No results...</p> : null}

      <styled.Grid>
        {pagedData?.map(item => (
          <styled.GridItem key={item.id} data-testid="grid-item">
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
