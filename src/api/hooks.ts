import {useMutation, useQuery} from '@tanstack/react-query';
import {getAllItems, getItemsByPage, insertItems, Item} from '~/models/items';

export function useItemsQuery() {
  const {data, isError, isLoading} = useQuery(['items'], getAllItems);

  return {data, isError, isLoading};
}

export function usePaginatedItemsQuery(page: number, pageSize: number) {
  const {data, isError, isLoading} = useQuery(
    ['items', page],
    () => getItemsByPage(page, pageSize),
    {keepPreviousData: true}
  );

  return {data, isError, isLoading};
}

export function useItemsMutation() {
  const {mutate, isLoading} = useMutation<
    Array<Item> | null,
    Error,
    Array<Omit<Item, 'id'>>
  >(items => insertItems(items));

  return {
    persistItems: mutate,
    isPersisting: isLoading,
  };
}
