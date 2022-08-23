import styled from 'styled-components';
import {useItemsQuery} from './api/hooks';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: ${props => props.theme.containerMaxWidths.sm};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    max-width: ${props => props.theme.containerMaxWidths.md};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    max-width: ${props => props.theme.containerMaxWidths.lg};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    max-width: ${props => props.theme.containerMaxWidths.xl};
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

export default function App() {
  const {data: itemsData} = useItemsQuery();

  return (
    <Grid>
      {itemsData?.map(item => (
        <GridItem key={item.id}>
          <GridImage>
            <img src={item.imageUrl} alt={item.title} />
          </GridImage>
          <GridDescription>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </GridDescription>
        </GridItem>
      ))}
    </Grid>
  );
}
