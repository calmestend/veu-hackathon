import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { DatabaseService } from 'src/database/database.service';
import { CreateTravel, SelectTravel } from './types';
import { eq } from 'drizzle-orm';

@Injectable()
export class TravelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getTravels() {
    return this.databaseService.db.query.travels.findMany();
  }

  async createTravel(travel: CreateTravel) {
    await this.databaseService.db.insert(schema.travels).values(travel);
  }

  async deleteTravel(travel: SelectTravel) {
    await this.databaseService.db
      .delete(schema.travels)
      .where(eq(schema.travels.id, travel.id));
  }

  async updateTravel(id: number, updates: Partial<SelectTravel>) {
    await this.databaseService.db
      .update(schema.travels)
      .set(updates)
      .where(eq(schema.travels.id, id));
  }
}
