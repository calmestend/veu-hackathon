import { Module } from '@nestjs/common';
import { DateController } from './date.controller';
import { DateService } from './date.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [DateController],
	providers: [DateService],
})
export class DateModule { }

