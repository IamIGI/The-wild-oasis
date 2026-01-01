import { id } from 'date-fns/locale';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded!');
  }

  return data;
}

/**
 *   //https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/38038070#questions
  // https://bxmaltcawkcfynthgfkk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //https://supabase.com/docs/reference/javascript/storage-from-upload
 * @param {*} newCabin 
 * @returns 
 */
export async function createEditCabin(newCabin, id) {
  console.log({ newCabin, id });
  const hasImagePath =
    newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll('/', '');
  //Replace '/' cuz with them supabase is creating folders
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.Create/edit cabin
  let query = supabase.from('cabins');
  if (!id) {
    //create
    query = query.insert([
      { ...newCabin, image: imagePath },
    ]);
  } else {
    //edit
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created!');
  }

  //Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //Delete the cabin row if error occur
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabins image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted!');
  }
}
