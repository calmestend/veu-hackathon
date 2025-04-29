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
import { CreateDate, SelectDate } from './types';
import { DateService } from './date.service';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDates() {
    return this.dateService.getDates();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createDate(@Body() request: CreateDate) {
    return this.dateService.createDate(request);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteDate(@Body() request: SelectDate) {
    return this.dateService.deleteDate(request);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateDate(@Body() request: SelectDate) {
    return this.dateService.updateDate(request.id, request);
  }
}
