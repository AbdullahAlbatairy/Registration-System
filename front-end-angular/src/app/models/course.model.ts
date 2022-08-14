import { Instructor } from "./instructor.model";
import { Student } from "./student.model";

export interface Course{
    id?: number;
    courseName: string;
    courseDesc: string;
    students?: Student[];
    instrcutors?: Instructor[];
}