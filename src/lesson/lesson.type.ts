import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => [StudentType])
  students: string[];

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
