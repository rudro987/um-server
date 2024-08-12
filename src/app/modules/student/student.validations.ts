import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("First name is required"),
  middleName: z
    .string()
    .trim()
    .optional(),
  lastName: z
    .string()
    .trim()
    .nonempty("Last name is required"),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .nonempty("Father's name is required"),
  fatherOccupation: z
    .string()
    .trim()
    .nonempty("Father's Occupation is required"),
  fatherContactNo: z
    .string()
    .trim()
    .nonempty("Father's Contact number is required"),
  motherName: z
    .string()
    .trim()
    .nonempty("Mother's name is required"),
  motherOccupation: z
    .string()
    .trim()
    .nonempty("Mother's Occupation is required"),
  motherContactNo: z
    .string()
    .trim()
    .nonempty("Mother's Contact number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Guardian's name is required"),
  occupation: z
    .string()
    .trim()
    .nonempty("Guardian's Occupation is required"),
  contactNo: z
    .string()
    .trim()
    .nonempty("Guardian's Contact number is required"),
  address: z
    .string()
    .trim()
    .nonempty("Guardian's address is required"),
});

const studentValidationSchema = z.object({
  id: z
    .string()
    .nonempty("Student id is required"),
  name: userNameValidationSchema,
  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Gender is required and must be either 'male', 'female', or 'other'",
      }),
    }),
  dateOfBirth: z
    .string()
    .trim()
    .optional(),
  email: z
    .string()
    .email()
    .trim()
    .nonempty("Email address is required"),
  contactNo: z
    .string()
    .trim()
    .nonempty("Contact number is required"),
  emergencyContactNo: z
    .string()
    .trim()
    .nonempty("Emergency Contact number is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  presentAddress: z
    .string()
    .trim()
    .nonempty("Present address is required"),
  permanentAddress: z
    .string()
    .trim()
    .nonempty("Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(["active", "blocked"])
    .default("active"),
});

export default studentValidationSchema;
