import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Controller('dify')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post('apps')
  create(@Body() createAppDto: CreateAppDto) {
    return this.appsService.create(createAppDto);
  }

  @Get('apps')
  findAll() {
    return this.appsService.findAll();
  }

  @Get('app/:id')
  findOne(@Param('id') id: string) {
    return this.appsService.findOne(id);
  }

  @Patch('app/:id')
  update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
    return this.appsService.update(id, updateAppDto);
  }

  @Delete('app/:id')
  remove(@Param('id') id: string) {
    return this.appsService.remove(id);
  }
}
