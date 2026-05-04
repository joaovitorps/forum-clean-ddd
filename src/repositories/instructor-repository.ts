import type { Instructor } from "@/domain/entities/instructor";

export interface InstructorRepository {
  create(data: Instructor): Promise<Instructor>;
}
