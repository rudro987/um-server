import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    //? Create a user object

    const user : Partial<TUser> = {};

    //*built in static method
  
    // if(await Student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists')
    // }

    user.password = password || config.default_pass as string;

    // set user role

    user.role = 'student';

    //manually generated id

    user.id = '2030100001'

    //create a user
    const result = await User.create(user); 

    //create a student
    if(Object.keys(result).length){
        // set id , _id as user
        studentData.id = result.id;
        studentData.user = result._id;
    }

    //? instance method
    // const student = new Student(studentData);
  
    // if(await student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists!')
    // }
    // const result = await student.save();
  
    return result;
  };

  export const UserServices = {
    createStudentIntoDB
  }