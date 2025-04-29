import { Module } from '@nestjs/common';
import { DriverReportController } from './driver_report.controller';
import { DriverReportService } from './driver_report.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [DriverReportController],
	providers: [DriverReportService],
})
export class DriverReportModule { }
