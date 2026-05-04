import type { Instructor } from "../entities/instructor";

export interface InstructorRepository {
    create(data: Instructor): Promise<Instructor>
}