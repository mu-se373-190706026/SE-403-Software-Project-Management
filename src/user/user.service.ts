import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.users.findMany();
    }
    async createUser(data: CreateUserDto) {
        return await this.prisma.users.create({ data });
    }
    async login(loginData: LoginUserDto): Promise<any> {
        const user = await this.prisma.users.findUnique({
            where: { email: loginData.email }
        })
        if (user.email == loginData.email && user.password == loginData.password)
            return user
        else
            return 'Kullanini Adi veya Sifre Hatali'
    }
    async findOneUser(userId: number) {
        return await this.prisma.users.findUnique({
            where: {
                id: userId
            },
        })
    }
    async updateUser(userData: CreateUserDto, userId: number) {
        return await this.prisma.users.update({
            where: {
                id: userId
            },
            data: userData
        })
    }
    async deleteUser(userName: string) {
        await this.prisma.users.delete({
            where: { username: userName }
        })
        return 'Kullanici basariyla silindi'
    }
}
