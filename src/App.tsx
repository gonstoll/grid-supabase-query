import styled from 'styled-components';
import {useItemsQuery} from './api/hooks';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (min-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GridItem = styled.div`
  border: 1px solid #000;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const GridImage = styled.div`
  height: 250px;
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
