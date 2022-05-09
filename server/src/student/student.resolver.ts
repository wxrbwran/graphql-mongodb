import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { GraphQLGuard } from 'src/common/guards/graphql.guard';
import { UpdateStudentInput } from './update-student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Query((returns) => StudentType)
  @UseGuards(new GraphQLGuard())
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getStudents();
  }
  @Query((returns) => StudentType)
  signIn(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    // console.log('signIn', createStudentInput);
    return this.studentService.signIn(createStudentInput);
  }
  @Mutation((returns) => StudentType)
  async createStudent(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Mutation((returns) => StudentType)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    // console.log('updateStudentInput', updateStudentInput);
    return this.studentService.updateStudent(updateStudentInput);
  }

  @Mutation((returns) => StudentType)
  async removeStudentById(@Args('id') id: string) {
    return this.studentService.removeStudentById(id);
  }
}
