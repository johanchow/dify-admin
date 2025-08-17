import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppDto: CreateAppDto) {
    return this.prisma.app.create({
      data: createAppDto,
    });
  }

  async findAll() {
    return this.prisma.app.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const app = await this.prisma.app.findFirst({
      where: {
        id,
      },
    });

    if (!app) {
      throw new NotFoundException(`App with ID ${id} not found`);
    }

    return app;
  }

  async update(id: string, updateAppDto: UpdateAppDto) {
    await this.findOne(id);

    return this.prisma.app.update({
      where: { id },
      data: updateAppDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.app.delete({
      where: { id },
    });
  }
}
