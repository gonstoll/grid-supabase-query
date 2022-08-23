import * as React from 'react';
import styled, {css} from 'styled-components';
import {useItemsQuery} from './api/hooks';
import {useSearch} from './hooks';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: ${props => props.theme.containerMaxWidths.sm};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: ${props => props.theme.containerMaxWidths.md};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: ${props => props.theme.containerMaxWidths.lg};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    max-width: ${props => props.theme.containerMaxWidths.xl};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GridItem = styled.div`
  border: 1px solid #000;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const GridImage = styled.div`
  height: 350px;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    height: 250px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const GridDescription = styled.div`
  padding: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const Button = styled.button<{isDisabled: boolean}>`
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  padding: 15px 30px;
  ${props =>
    props.isDisabled
      ? css`
          cursor: not-allowed;
          opacity: 0.7;
        `
      : null};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  height: 40px;
`;

const PER_PAGE = 8;

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
    <Container>
      <Input
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Search items"
      />
      {!pagedData?.length && !isLoading ? <p>No results...</p> : null}
      <Grid>
        {pagedData?.map(item => (
          <GridItem key={item.id}>
            <GridImage>
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
            </GridImage>
            <GridDescription>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </GridDescription>
          </GridItem>
        ))}
      </Grid>
      <ButtonsWrapper>
        <Button isDisabled={page <= 1} onClick={() => handlePagination('prev')}>
          Previous page
        </Button>
        <Button
          isDisabled={page >= totalPages}
          onClick={() => handlePagination('next')}
        >
          Next page
        </Button>
      </ButtonsWrapper>
    </Container>
  );
}
