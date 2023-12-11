import axios from 'axios';

const uploadImage = async (selectedImage) => {
  try {
    // const result = await axios.post('https://api.cloudinary.com/v1_1/dvku4ky8h/image/upload', {
    //   upload_preset: 'crossProject',
    //   file: selectedImage[0],
    // });
    // return result;
    const data = new FormData();
    console.log(selectedImage[0].type.startsWith('image/'));
    console.log(selectedImage[0]);

    data.append('file', selectedImage[0].base64);
    data.append('upload_preset', 'crossProject');
    await fetch('https://api.cloudinary.com/v1_1/dvku4ky8h/image/upload', {
      method: 'post',
      body: data,
    }).then(res => res.json()).
      then(data => {
        console.log(data);

      });
  } catch (error) {
    console.error(error);
  }
};

export { uploadImage };
