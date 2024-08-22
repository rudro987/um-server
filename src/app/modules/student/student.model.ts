import { Schema, model } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's Contact number is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's Contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Guradian's name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Guradian's Occupation is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Guradian's Contact number is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Guradian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student id is required"],
    uniqure: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: [20, "Password can not be more then 20 characters"],
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
    trim: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email address is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Contact number is required"],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, "Emergency Contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian info is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian info is required"],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//pre save middleware/hook

studentSchema.pre("save", async function (next) {
  //hashing password and save into db
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware/hook

studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//Query middleware

studentSchema.pre("find", function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

//* creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//?creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
