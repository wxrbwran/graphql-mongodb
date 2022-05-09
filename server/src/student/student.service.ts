import { UpdateStudentInput } from './update-student.input';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentInput } from './create-student.input';

import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const lesson = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });
    return this.studentRepository.save(lesson);
  }

  async signIn(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: {
        firstName: createStudentInput.firstName,
        lastName: createStudentInput.lastName,
      },
    });
    if (!student) {
      throw new InternalServerErrorException('请检查输入姓名');
    }
    const payload: any = { id: student.id };
    const token = await this.jwtService.sign(payload);
    return { ...student, token };
    // return student;
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }
  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async updateStudent(
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    // const student = await this.studentRepository.preload({
    //   id: updateStudentInput.id,
    //   ...updateStudentInput,
    // });
    const student = await this.getStudent(updateStudentInput.id);
    if (!student) {
      throw new NotFoundException('not found');
    }
    // console.log('student', student);
    Object.assign(student, updateStudentInput);
    // console.log('student', student);

    return this.studentRepository.save(student);
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
