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
    const {data} = await supabase
      .from<Item>('items')
      .select('*')
      .range(offset, offset + pageSize - 1);

    return {items: data, total: 40};
  } else {
    const {data} = await supabase
      .from<Item>('items')
      .select('*')
      .range(offset, offset + pageSize - 1)
      .textSearch('title', title);

    return {items: data, total: 40};
  }
}

export async function getAllItems() {
  const {data} = await supabase.from<Item>('items').select('*');

  return data;
}

export async function insertItems(items: Array<Omit<Item, 'id'>>) {
  const {data} = await supabase.from<Item>('items').insert(items);

  return data;
}
