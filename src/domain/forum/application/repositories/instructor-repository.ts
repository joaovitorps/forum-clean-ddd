import type { Instructor } from "@/domain/forum/enterprise/entities/instructor";

export interface InstructorRepository {
  create(data: Instructor): Promise<Instructor>;
}
