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
import { CreateDriverReport, SelectDriverReport } from './types';
import { DriverReportService } from './driver_report.service';

@Controller('driver-report')
export class DriverReportController {
  constructor(private readonly travelService: DriverReportService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDriverReports() {
    return this.travelService.getDriverReports();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createDriverReport(@Body() request: CreateDriverReport) {
    return this.travelService.createDriverReport(request);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteDriverReport(@Body() request: SelectDriverReport) {
    return this.travelService.deleteDriverReport(request);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateDriverReport(@Body() request: SelectDriverReport) {
    return this.travelService.updateDriverReport(request.id, request);
  }
}
