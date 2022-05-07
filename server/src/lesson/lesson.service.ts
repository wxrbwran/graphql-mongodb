import { Student } from './../student/student.entity';
import { CreateLessonInput } from './create-lesson.input';
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

  async createLesson(createLessonDTO: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      ...createLessonDTO,
      // students: [],
    });
    return this.lessonRepository.save(lesson);
  }
  async handleStudents(lesson) {
    if (!!lesson.students && lesson.students.length > 0) {
      const students = await this.studentService.getStudentsByIds(
        lesson.students,
      );
      console.log('students', students);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      lesson.students = students;
      console.log('lesson', lesson);
    }

    return lesson;
  }
  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    console.log('lesson', lesson);
    return this.handleStudents(lesson);
  }
  async getLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find();
    const newLessons = [];
    for (let i = 0; i < lessons.length; i++) {
      const cur = lessons[i];
      const newLesson = await this.handleStudents(cur);
      newLessons.push(newLesson);
    }
    // lessons.forEach(async (lesson) => {
    //   const newLesson = await this.handleStudents(lesson);
    //   newLessons.push(newLesson);
    // });
    return newLessons;
  }

  async removeLessonById(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    this.lessonRepository.remove(lesson);
    return lesson;
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
