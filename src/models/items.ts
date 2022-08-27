import {supabase} from '~/lib/api';

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export async function getItems(page: number, pageSize: number, title: string) {
  const offset = pageSize * (page - 1);

  if (!title) {
    const {data, count} = await supabase
      .from<Item>('items')
      .select('*', {count: 'exact'})
      .range(offset, offset + pageSize - 1);

    return {items: data, total: count || 40};
  } else {
    const {data, count} = await supabase
      .from<Item>('items')
      .select('*', {count: 'exact'})
      .range(offset, offset + pageSize - 1)
      .textSearch('title', title);

    return {items: data, total: count};
  }
}

export async function getAllItems() {
  const {data} = await supabase.from<Item>('items').select('*');

  return data;
}

export async function insertItems(items: Array<Omit<Item, 'id'>>) {
  const {data, error} = await supabase.from<Item>('items').insert(items);

  if (error) {
    throw error;
  }

  return data;
}
