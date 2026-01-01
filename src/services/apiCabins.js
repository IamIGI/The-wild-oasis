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

export async function createCabin(newCabin) {
  //https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/38038070#questions
  //https://supabase.com/docs/reference/javascript/storage-from-upload
  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll('/', '');
  //Replace '/' cuz with them supabase is creating folders
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://bxmaltcawkcfynthgfkk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
