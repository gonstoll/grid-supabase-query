import {useMutation, useQuery} from '@tanstack/react-query';
import {getAllItems, getItems, insertItems, Item} from '~/models/items';

export const queryKeys = {
  all: ['items'] as const,
  search: (page: number, search: string) =>
    [...queryKeys.all, page, search] as const,
};

export function useItemsQuery() {
  const {data, isError, isLoading} = useQuery(queryKeys.all, getAllItems);

  return {data, isError, isLoading};
}

export function useServerItemsQuery(
  page: number,
  pageSize: number,
  search: string
) {
  const {data, isError, isLoading} = useQuery(
    queryKeys.search(page, search),
    () => getItems(page, pageSize, search),
    {keepPreviousData: true, staleTime: 30000}
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
