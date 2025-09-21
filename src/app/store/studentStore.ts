import { create } from "zustand";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talent: string;
  reason: string;
  faculty: string;
  university: string;
  image?: string;
}

interface StudentState {
  students: Student[];
  addStudent: (student: Student) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
}));
