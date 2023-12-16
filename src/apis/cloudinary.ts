import axios from 'axios';

const uploadImage = async (selectedImage) => {
  try {
    const result = await axios.post('https://api.cloudinary.com/v1_1/dvku4ky8h/image/upload', {
      upload_preset: 'crossProject',
      file: 'data:image/jpg;base64,' + selectedImage[0].base64,
    });
    console.log(result.data.url);
    return result.data.url;
  } catch (error) {
    console.error(error);
  }
};

export { uploadImage };
