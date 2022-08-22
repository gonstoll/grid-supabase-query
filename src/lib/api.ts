import {createClient} from '@supabase/supabase-js';
import invariant from 'tiny-invariant';
import {SUPABASE_URL, SUPABASE_KEY} from './definitions';

invariant(SUPABASE_URL, 'Supabase URL must be defined');
invariant(SUPABASE_KEY, 'Supabase KEY must be defined');

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
