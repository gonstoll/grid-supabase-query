import {useItemsQuery} from './api/hooks';

export default function App() {
  const {data: itemsData} = useItemsQuery();

  console.log('data', itemsData);

  return <p>Hello world!</p>;
}
