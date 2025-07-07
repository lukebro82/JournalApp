export const fileUpload = async (file) => {
  if (!file) throw new Error("No file to upload");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dhyqdyzw8/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Failed to upload file");

    const data = await resp.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
