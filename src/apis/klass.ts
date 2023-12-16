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

const getClassOfTeacher = async id => {
  try {
    const listClass = await axios.get(`${baseUrl}/class/teacher/${id}`);
    return listClass;
  } catch (error) {
    console.log(error);
  }
};

const getDetailClass = async id => {
  try {
    const detailClass = await axios.get(`${baseUrl}/class/detail/${id}`);
    return detailClass;
  } catch (error) {
    console.log(error);
  }
};

const enrollClass = async (code, userId) => {
  try {
    const result = await axios.post(`${baseUrl}/class/enroll`, {
      code,
      userId,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const addClass = async (teacherId, name, startTime, endTime, numOfWeek) => {
  try {
    const newClass = await axios.post(`${baseUrl}/class/add`, {
      teacherId,
      name,
      startTime,
      endTime,
      numOfWeek,
    });

    return newClass;
  } catch (error) {
    console.log(error);
  }
};

const deleteClass = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/class/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  getClassOfStudent,
  getDetailClass,
  enrollClass,
  getClassOfTeacher,
  addClass,
  deleteClass,
};
