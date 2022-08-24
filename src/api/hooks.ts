import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation<
    Array<Item> | null,
    Error,
    Array<Omit<Item, 'id'>>,
    {optimisticItem: Item; snapshot?: Array<Item>}
  >(items => insertItems(items), {
    onMutate: async items => {
      await queryClient.cancelQueries(queryKeys.all);

      const previousItems = queryClient.getQueryData<Array<Item>>(
        queryKeys.all
      );

      const optimisticItem: Item = {
        ...items[0],
        id: new Date().getTime() * Math.random() * 100000,
      };

      queryClient.setQueryData<Array<Item>>(queryKeys.all, old => {
        if (old) {
          return [optimisticItem, ...old];
        }
        return [];
      });

      return {optimisticItem, snapshot: previousItems};
    },
    onSuccess: (item, _, context) => {
      queryClient.setQueryData<Array<Item>>(queryKeys.all, old => {
        if (old) {
          return old.map(o =>
            o.id !== context?.optimisticItem.id
              ? o
              : item?.[0] || context.optimisticItem
          );
        }
        return [];
      });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData<Array<Item>>(queryKeys.all, context?.snapshot);
    },
  });

  return {
    persistItems: mutate,
    isPersisting: isLoading,
  };
}
