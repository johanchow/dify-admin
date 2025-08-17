import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppDto: CreateAppDto) {
    try {
      return await this.prisma.app.create({
        data: createAppDto,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('App with this name already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.app.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    // 验证UUID格式
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    try {
      const app = await this.prisma.app.findFirst({
        where: {
          id,
        },
      });

      if (!app) {
        throw new NotFoundException(`App with ID ${id} not found`);
      }

      return app;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid UUID format');
    }
  }

  async update(id: string, updateAppDto: UpdateAppDto) {
    // 验证UUID格式
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    // 检查应用是否存在
    await this.findOne(id);

    // 直接使用更新数据，因为UpdateAppDto中不包含tenant_id
    const updateData = updateAppDto;

    try {
      return await this.prisma.app.update({
        where: { id },
        data: updateData,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`App with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    // 验证UUID格式
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    await this.findOne(id);

    try {
      return await this.prisma.app.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`App with ID ${id} not found`);
      }
      throw error;
    }
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
