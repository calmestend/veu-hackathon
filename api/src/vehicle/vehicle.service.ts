import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { DatabaseService } from 'src/database/database.service';
import { CreateVehicle, SelectVehicle } from './types';
import { eq } from 'drizzle-orm';

@Injectable()
export class VehicleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getVehicles() {
    return this.databaseService.db.query.vehicles.findMany();
  }

  async createVehicle(vehicle: CreateVehicle) {
    await this.databaseService.db.insert(schema.vehicles).values(vehicle);
  }

  async deleteVehicle(vehicle: SelectVehicle) {
    await this.databaseService.db
      .delete(schema.vehicles)
      .where(eq(schema.vehicles.id, vehicle.id));
  }

  async updateVehicle(id: number, updates: Partial<SelectVehicle>) {
    await this.databaseService.db
      .update(schema.vehicles)
      .set(updates)
      .where(eq(schema.vehicles.id, id));
  }
}
