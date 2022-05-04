import { StudentService } from './../student/student.service';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateLessonDTO } from './create-lesson.dto';
import { AssignInput } from './assign-input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  lesson(@Args({ name: 'id', type: () => String }) id: string) {
    // lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }
  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }
  @Mutation((returns) => LessonType)
  createLesson(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args({ name: 'createLessonDTO', type: () => CreateLessonDTO })
    createLessonDTO: CreateLessonDTO,
  ) {
    return this.lessonService.createLesson(createLessonDTO);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args({
      name: 'assignInput',
      type: () => AssignInput,
    })
    assignInput: AssignInput,
  ) {
    // @Args('endDate') endDate: string, // @Args('startDate') startDate: string, // @Args('name') name: string,
    return this.lessonService.assignStudentsToLesson(
      assignInput.lessonId,
      assignInput.studentIds,
    );
  }

  // @ResolveField()
  // async studens(@Parent() lesson: Lesson) {
  //   return this.studentService.getStudentsByIds(lesson.students);
  // }
}
