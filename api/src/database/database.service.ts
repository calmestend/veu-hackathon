import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { createClient, Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql/node';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import { DatabaseSchema, schemas } from 'src/schemas';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private client: Client;
  public db: LibSQLDatabase<DatabaseSchema>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      this.client = createClient({
        url: this.configService.getOrThrow('DATABASE_URL'),
        authToken: this.configService.getOrThrow('DATABASE_TOKEN'),
      });

      this.db = drizzle(this.client, {
        schema: { ...schemas },
        logger: this.configService.get('NODE_ENV') === 'development',
      });

      this.logger.log('Database connection established successfully');
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw error;
    }
  }
}
