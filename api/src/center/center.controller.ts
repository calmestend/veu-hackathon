import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCenter, SelectCenter } from './types';
import { CenterService } from './center.service';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCenters() {
    return this.centerService.getCenters();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createCenter(@Body() request: CreateCenter) {
    return this.centerService.createCenter(request);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteCenter(@Body() request: SelectCenter) {
    return this.centerService.deleteCenter(request);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateCenter(@Body() request: SelectCenter) {
    return this.centerService.updateCenter(request.id, request);
  }
}
