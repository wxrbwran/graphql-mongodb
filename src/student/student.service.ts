import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';

import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudentDTO: CreateStudentInput): Promise<Student> {
    const lesson = this.studentRepository.create({
      id: uuid(),
      ...createStudentDTO,
    });
    return this.studentRepository.save(lesson);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }
  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async removeStudentById(id: string): Promise<Student> {
    const student = await this.getStudent(id);
    this.studentRepository.remove(student);
    return student;
  }
  async getStudentsByIds(studentIds: string[]): Promise<Student[]> {
    console.log('studentIds', studentIds);
    return this.studentRepository.find({
      where: {
        id: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          $in: studentIds,
        },
      },
    });
  }
}
