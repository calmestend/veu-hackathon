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
import { CreateVehicle, SelectVehicle } from './types';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createVehicle(@Body() request: CreateVehicle) {
    return this.vehicleService.createVehicle(request);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteVehicle(@Body() request: SelectVehicle) {
    return this.vehicleService.deleteVehicle(request);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateVehicle(@Body() request: SelectVehicle) {
    return this.vehicleService.updateVehicle(request.id, request);
  }
}
