import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignInput {
  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  studentIds: string[];

  @IsUUID()
  @Field((type) => ID)
  lessonId: string;
}
