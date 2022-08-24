import * as React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {queryKeys, useItemsMutation, usePaginatedItemsQuery} from './api/hooks';
import {PER_PAGE} from './definitions';
import {getItems} from './models/items';
import * as styled from './styled';
import {useDebounce} from './hooks';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
  imageUrl: HTMLInputElement;
}

export default function AppTwo() {
  const queryClient = useQueryClient();

  const formRef = React.useRef<HTMLFormElement>(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const {debounced} = useDebounce(search);
  const {data, isLoading} = usePaginatedItemsQuery(page, PER_PAGE, debounced);
  const {persistItems} = useItemsMutation();

  const totalPages = data?.total || 0;
  const hasMore =
    data?.items &&
    data.items.length >= PER_PAGE &&
    page < totalPages / PER_PAGE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPage(1);
    setSearch(event.currentTarget.value);
  }

  function handlePagination(mode: 'prev' | 'next') {
    if (!data) return;
    if (mode === 'prev' && page > 1) {
      setPage(page - 1);
    }
    if (mode === 'next' && hasMore) {
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

  React.useEffect(() => {
    if (hasMore) {
      queryClient.prefetchQuery(queryKeys.search(page + 1, debounced), () =>
        getItems(page + 1, PER_PAGE, debounced)
      );
    }
  }, [debounced, hasMore, page, queryClient]);

  return (
    <styled.Container>
      <styled.Input
        type="text"
        name="search"
        role="search"
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

      {!data?.items?.length && !isLoading ? <p>No results...</p> : null}

      <styled.Grid>
        {data?.items?.map(item => (
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
          isDisabled={!hasMore}
          onClick={() => handlePagination('next')}
        >
          Next page
        </styled.Button>
      </styled.ButtonsWrapper>
    </styled.Container>
  );
}
