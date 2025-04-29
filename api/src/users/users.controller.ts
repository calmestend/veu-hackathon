import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
	Param,
	ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, SelectUser } from './types';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	// Rutas generales de usuarios
	@Get()
	@HttpCode(HttpStatus.OK)
	async getUsers() {
		return this.userService.getUsers();
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	async createUser(@Body() request: CreateUser) {
		return this.userService.createUser(request);
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	async deleteUser(@Body() request: SelectUser) {
		return this.userService.deleteUser(request);
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() request: Partial<SelectUser>
	) {
		return this.userService.updateUser(id, request);
	}

	// Rutas para clientes (role = 1)
	@Get('clients')
	@HttpCode(HttpStatus.OK)
	async getClients() {
		return this.userService.getClients();
	}

	@Post('clients')
	@HttpCode(HttpStatus.OK)
	async createClient(@Body() request: Omit<CreateUser, 'role'>) {
		return this.userService.createClient(request);
	}

	@Delete('clients')
	@HttpCode(HttpStatus.OK)
	async deleteClient(@Body() request: SelectUser) {
		return this.userService.deleteClient(request);
	}

	@Put('clients/:id')
	@HttpCode(HttpStatus.OK)
	async updateClient(
		@Param('id', ParseIntPipe) id: number,
		@Body() request: Partial<Omit<SelectUser, 'role'>>
	) {
		return this.userService.updateClient(id, request);
	}

	// Rutas para conductores (role = 2)
	@Get('drivers')
	@HttpCode(HttpStatus.OK)
	async getDrivers() {
		return this.userService.getDrivers();
	}

	@Post('drivers')
	@HttpCode(HttpStatus.OK)
	async createDriver(@Body() request: Omit<CreateUser, 'role'>) {
		return this.userService.createDriver(request);
	}

	@Delete('drivers')
	@HttpCode(HttpStatus.OK)
	async deleteDriver(@Body() request: SelectUser) {
		return this.userService.deleteDriver(request);
	}

	@Put('drivers/:id')
	@HttpCode(HttpStatus.OK)
	async updateDriver(
		@Param('id', ParseIntPipe) id: number,
		@Body() request: Partial<Omit<SelectUser, 'role'>>
	) {
		return this.userService.updateDriver(id, request);
	}
}
