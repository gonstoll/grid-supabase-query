import {supabase} from '~/lib/api';

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export async function getItemsByPage(page: number, pageSize: number) {
  const offset = pageSize * (page - 1);
  const {data} = await supabase.from<Item>('items').select('*').range(0, offset);

  return data;
}

export async function getItemsByTitle(title: string) {
  const {data} = await supabase
    .from<Item>('items')
    .select('*')
    .eq('title', title);

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
