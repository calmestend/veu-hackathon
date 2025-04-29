import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { DatabaseService } from 'src/database/database.service';
import { eq } from 'drizzle-orm';
import { CreateCenter, SelectCenter } from './types';

@Injectable()
export class CenterService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCenters() {
    return this.databaseService.db.query.centers.findMany();
  }

  async createCenter(center: CreateCenter) {
    await this.databaseService.db.insert(schema.centers).values(center);
  }

  async deleteCenter(center: SelectCenter) {
    await this.databaseService.db
      .delete(schema.centers)
      .where(eq(schema.centers.id, center.id));
  }

  async updateCenter(id: number, updates: Partial<SelectCenter>) {
    await this.databaseService.db
      .update(schema.centers)
      .set(updates)
      .where(eq(schema.centers.id, id));
  }
}
