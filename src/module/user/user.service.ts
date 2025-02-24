import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly secretKey = process.env.SECRET_KEY_PASSWORD;

  async create(createUserDto: CreateUserDto) {    
    return await this.userRepository.save({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),      
    });
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: number, throwException: boolean = true, withDeleted: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { id },      
      withDeleted
    });

    if (!user && throwException) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByUsername(username: string, throwException: boolean = true, withDeleted: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { username },
      withDeleted
    });

    if (!user && throwException) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByEmail(email: string, throwException: boolean = true, withDeleted: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted
    });

    if (!user && throwException) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByPhone(phone: string, throwException: boolean = true, withDeleted: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { phone },
      withDeleted
    });

    if (!user && throwException) throw new NotFoundException('User not found');

    return user;
  }

  async findOneBy(condition: Partial<User>): Promise<User | undefined> {
    return this.userRepository.findOneBy(condition);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async updatePassword(user: User, newPassword: string) {
    return this.userRepository.update(user.id, {
      password: await this.hashPassword(newPassword)
    });
  }


  async getProfile(userId: number) {
    const user = await this.findOneById(userId);
    return user;
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(userId);
    return this.userRepository.update(user.id, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      phone: updateUserDto.phone
    });
  }

  setResetPasswordToken(userId: number, resetPasswordToken: string) {
    return this.userRepository.update({ id: userId }, {
      resetPasswordToken
    });
  }

  async findOneByResetToken(resetPasswordToken: string): Promise<User | null> {
    return this.userRepository.findOneBy({ resetPasswordToken });
  }

  async changePassword(userId: number, password: string, confirmPassword: string) {
    if (password != confirmPassword) {
      throw new BadRequestException("The passwords entered do not match. Please try again.");
    }

    password = await this.hashPassword(password);

    return this.userRepository.update({ id: userId }, {
      password,
    });
  }

  clearResetPasswordToken(userId: number) {
    return this.userRepository.update({ id: userId }, {
      resetPasswordToken: null
    });
  }
}
