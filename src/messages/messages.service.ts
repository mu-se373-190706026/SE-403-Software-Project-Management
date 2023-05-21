import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) { }

    async createMessage(message: string) {
        const exists = await this.checkIfMessageExists(message);
        if (exists) {
            return {
                ...exists,
                created: false,
            };
        }

        const newMessage = await this.prisma.message.create({
            data: {
                message,
            },
        });

        return {
            ...newMessage,
            created: true,
        };
    }

    private async checkIfMessageExists(message) {
        return this.prisma.message.findFirst({
            where: {
                message,
            },
        });
    }
    async messages(ids: number[]) {
        return this.prisma.message.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
      }
    
      async getContext(ids: number[]) {
        return (await this.messages(ids))
          .filter(
            (message, index, self) =>
              index === self.findIndex((t) => t.message === message.message),
          )
          .reduce((acc, message) => {
            return acc + message.message + '\n';
          }, '');
      }

}
