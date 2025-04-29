import { Injectable } from '@nestjs/common';
import * as schema from './schema';
import { DatabaseService } from 'src/database/database.service';
import { CreateDriverReport, SelectDriverReport } from './types';
import { eq } from 'drizzle-orm';

@Injectable()
export class DriverReportService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getDriverReports() {
    return this.databaseService.db.query.driverReports.findMany();
  }

  async createDriverReport(driverReport: CreateDriverReport) {
    await this.databaseService.db
      .insert(schema.driverReports)
      .values(driverReport);
  }

  async deleteDriverReport(driverReport: SelectDriverReport) {
    await this.databaseService.db
      .delete(schema.driverReports)
      .where(eq(schema.driverReports.id, driverReport.id));
  }

  async updateDriverReport(id: number, updates: Partial<SelectDriverReport>) {
    await this.databaseService.db
      .update(schema.driverReports)
      .set(updates)
      .where(eq(schema.driverReports.id, id));
  }
}
