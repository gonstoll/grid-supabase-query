import {supabase} from '~/lib/api';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export async function getAllItems() {
  const {data: items} = await supabase.from<Item>('items').select('*');

  return items;
}
