import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './profile.entity';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (userFound) {
      return new HttpException(
        'Nombre de usuario ya existe',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find({
      relations: ['posts'],
    });
  }
  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!userFound) {
      return new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }
  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) {
      return new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete({ id });
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) {
      return new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return new HttpException('Usuario no encontrado!', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepository.create(profile);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }
}
