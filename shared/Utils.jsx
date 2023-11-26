import supabase from "../client/SuperbaseClient";


export const uploadImage = async (file) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(file.name, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    throw error;
  }
  return data.path;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}