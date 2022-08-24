import {rest} from 'msw';
import {SUPABASE_URL} from '~/lib/definitions';
import {mockItems} from '.';

export const handlers = [
  rest.get(`${SUPABASE_URL}/rest/v1/items`, (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const limit = req.url.searchParams.get('limit');
    const title = req.url.searchParams.get('title')?.split('.')[1];

    const filteredItems = mockItems
      .filter(item => (title ? item.title === title : item))
      .slice(Number(offset), Number(offset) + Number(limit));

    return res(ctx.json(filteredItems));
  }),
];
