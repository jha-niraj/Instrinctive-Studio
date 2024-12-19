import { Student } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StudentState {
    // State
    students: Student[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setStudents: (students: Student[]) => void;
    setIsLoading: (loading: Boolean) => void;
    addStudent: (student: Student) => void;
    deleteStudent: (id: string) => void;
    updateStudent: (id: string, updatedData: Partial<Student>) => void;

    // Async Actions
    fetchStudents: () => Promise<void>;
    addStudentAsync: (studentData: Omit<Student, 'id' | 'lastLogin'>) => Promise<void>;
    deleteStudentAsync: (id: string) => Promise<void>;
    updateStudentAsync: (id: string, updatedData: Partial<Student>) => Promise<void>;
}

export const useStudentStore = create<StudentState>()(
    devtools(
        (set, get) => ({
            // Initial State
            students: [],
            isLoading: false,
            error: null,

            // Sync Actions:
            setStudents: (students) => set({ students }),
            setIsLoading: (loading: boolean) => set({ isLoading: loading }),

            addStudent: (student) =>
                set((state) => ({
                    students: [...state.students, student]
                })),

            deleteStudent: (id) =>
                set((state) => ({
                    students: state.students.filter(student => student.id !== id),
                    error: null
                })),

            // Async Actions:
            fetchStudents: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch('/api/getStudents');
                    if (!response.ok) throw new Error('Failed to fetch students');

                    const students = await response.json();
                    set({ students, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch students',
                        isLoading: false
                    });
                }
            },
            addStudentAsync: async (studentData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch('/api/addstudent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(studentData),
                    });

                    if (!response.ok) throw new Error('Failed to add student');

                    const newStudent = await response.json();
                    console.log(newStudent);
                    
                    get().addStudent(newStudent.response);

                    set({ isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to add student',
                        isLoading: false
                    });
                    throw error;
                }
            },

            deleteStudentAsync: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post("/api/deletestudent", { id });

                    if (!response) throw new Error('Failed to delete student');

                    // Update local state immediately
                    get().deleteStudent(id);

                    set({ isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to delete student',
                        isLoading: false
                    });
                    throw error;
                }
            },
        })
    )
)