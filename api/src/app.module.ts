import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DateModule } from './date/date.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CenterModule } from './center/center.module';
import { TravelModule } from './travel/travel.module';
import { DriverReportModule } from './driver_report/driver_report.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UsersModule,
		DateModule,
		VehicleModule,
		CenterModule,
		TravelModule,
		DriverReportModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
