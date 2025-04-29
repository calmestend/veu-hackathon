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
import { TravelService } from './travel.service';
import { CreateTravel, SelectTravel } from './types';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTravels() {
    return this.travelService.getTravels();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createTravel(@Body() request: CreateTravel) {
    return this.travelService.createTravel(request);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteTravel(@Body() request: SelectTravel) {
    return this.travelService.deleteTravel(request);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateTravel(@Body() request: SelectTravel) {
    return this.travelService.updateTravel(request.id, request);
  }
}
