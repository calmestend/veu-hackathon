import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { CreateDate, SelectDate } from './types';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getDates() {
    return this.databaseService.db.query.dates.findMany();
  }

  async createDate(date: CreateDate) {
    await this.databaseService.db.insert(schema.dates).values(date);
  }

  async deleteDate(date: SelectDate) {
    await this.databaseService.db
      .delete(schema.dates)
      .where(eq(schema.dates.id, date.id));
  }

  async updateDate(id: number, updates: Partial<SelectDate>) {
    await this.databaseService.db
      .update(schema.dates)
      .set(updates)
      .where(eq(schema.dates.id, id));
  }
}
