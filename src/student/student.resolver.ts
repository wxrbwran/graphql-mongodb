import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateStudentDTO } from './create-student.dto';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getStudents();
  }
  @Mutation((returns) => StudentType)
  async createStudent(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args('createStudentDTO') createStudentDTO: CreateStudentDTO,
  ) {
    return this.studentService.createStudent(createStudentDTO);
  }

  @Mutation((returns) => StudentType)
  async removeStudentById(@Args('id') id: string) {
    return this.studentService.removeStudentById(id);
  }
}
