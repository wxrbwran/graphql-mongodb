import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(2)
  @Field()
  name: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  students: string[];

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;
}
