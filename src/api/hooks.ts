import {useQuery} from '@tanstack/react-query';
import {getAllItems} from '~/models/items';

export function useItemsQuery() {
  const {data, isError, isLoading} = useQuery(['items'], getAllItems);

  return {data, isError, isLoading};
}
