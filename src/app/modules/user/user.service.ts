import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    //? Create a user object

    const userData : Partial<TUser> = {};

    //*built in static method
  
    // if(await Student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists')
    // }

    userData.password = password || config.default_pass as string;

    // set user role

    userData.role = 'student';

    //manually generated id

    userData.id = '2030100001'

    //create a user
    const newUser = await User.create(userData); 

    //create a student
    if(Object.keys(newUser).length){
        // set id , _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await Student.create(studentData);
        return newStudent;
    }

    //? instance method
    // const student = new Student(studentData);
  
    // if(await student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists!')
    // }
    // const result = await student.save();
  };

  export const UserServices = {
    createStudentIntoDB
  }