import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule { }
