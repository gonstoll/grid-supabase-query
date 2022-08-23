import {supabase} from '~/lib/api';

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// Pagination on the server
export async function getItems() {
  const {data} = await supabase.from<Item>('items').select('*').range(0, 7);

  return data;
}

export async function getAllItems() {
  const {data} = await supabase.from<Item>('items').select('*');

  return data;
}

export async function insertItems(items: Array<Omit<Item, 'id'>>) {
  const {data} = await supabase.from<Item>('items').insert(items);

  return data;
}
