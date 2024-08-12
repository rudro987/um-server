import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  const result = await Student.create(studentData); //*built in static method

  if(await Student.isUserExists(studentData.id)){
    throw new Error('Student already exists')
  }

  //? instance method
  // const student = new Student(studentData);

  // if(await student.isUserExists(studentData.id)){
  //   throw new Error('Student already exists!')
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
