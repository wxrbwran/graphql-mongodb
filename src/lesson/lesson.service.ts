import { Student } from './../student/student.entity';
import { CreateLessonDTO } from './create-lesson.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly studentService: StudentService,
  ) {}

  async createLesson(createLessonDTO: CreateLessonDTO): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      ...createLessonDTO,
      // students: [],
    });
    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    console.log('lesson', lesson);

    const students = await this.studentService.getStudentsByIds(
      lesson.students,
    );
    console.log('students', students);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lesson.students = students;
    console.log('lesson', lesson);

    return lesson;
  }
  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.getLesson(lessonId);
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
