import supabase from './supabase';

export async function fetchData(tableName) {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error('Error fetching data:', error);
    return null;
  }
  return data;
}
