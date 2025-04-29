import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUser, SelectUser } from './types';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
	constructor(private readonly databaseService: DatabaseService) { }

	async getUsers() {
		return this.databaseService.db.query.users.findMany();
	}

	async createUser(user: CreateUser) {
		await this.databaseService.db.insert(schema.users).values(user);
	}

	async deleteUser(user: SelectUser) {
		await this.databaseService.db
			.delete(schema.users)
			.where(eq(schema.users.id, user.id));
	}

	async updateUser(id: number, updates: Partial<SelectUser>) {
		await this.databaseService.db
			.update(schema.users)
			.set(updates)
			.where(eq(schema.users.id, id));
	}

	// Métodos para clientes (role = 1)
	async getClients() {
		return this.databaseService.db.query.users.findMany({
			where: eq(schema.users.role, 1)
		});
	}

	async createClient(client: Omit<CreateUser, 'role'>) {
		const clientWithRole = { ...client, role: 1 };
		await this.databaseService.db.insert(schema.users).values(clientWithRole);
	}

	async deleteClient(client: SelectUser) {
		await this.databaseService.db
			.delete(schema.users)
			.where(eq(schema.users.id, client.id));
	}

	async updateClient(id: number, updates: Partial<Omit<SelectUser, 'role'>>) {
		await this.databaseService.db
			.update(schema.users)
			.set(updates)
			.where(eq(schema.users.id, id));
	}

	// Métodos para conductores (role = 2)
	async getDrivers() {
		return this.databaseService.db.query.users.findMany({
			where: eq(schema.users.role, 2)
		});
	}

	async createDriver(driver: Omit<CreateUser, 'role'>) {
		const driverWithRole = { ...driver, role: 2 };
		await this.databaseService.db.insert(schema.users).values(driverWithRole);
	}

	async deleteDriver(driver: SelectUser) {
		await this.databaseService.db
			.delete(schema.users)
			.where(eq(schema.users.id, driver.id));
	}

	async updateDriver(id: number, updates: Partial<Omit<SelectUser, 'role'>>) {
		await this.databaseService.db
			.update(schema.users)
			.set(updates)
			.where(eq(schema.users.id, id));
	}
}
