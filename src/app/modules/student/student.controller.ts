import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students data retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Student fetching failed",
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student's data retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Student not found",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student's data deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Student not found",
      error: err,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
