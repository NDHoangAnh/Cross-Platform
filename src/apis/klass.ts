import axios from 'axios';

const baseUrl = 'http://192.168.0.106:8089';

const getClassOfStudent = async id => {
  try {
    const listClass = await axios.get(`${baseUrl}/class/student/${id}`);
    return listClass;
  } catch (error) {
    console.log(error);
  }
};

export {getClassOfStudent};
