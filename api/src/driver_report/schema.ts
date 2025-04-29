import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from 'src/users/schema';

export const driverReports = sqliteTable('driver_reports', {
  id: integer('id').primaryKey(),
  driverId: integer('client_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  commentary: text('commmentary').notNull(),
  rating: integer('rating').notNull(),
  emotionStatus: text('emotion_status').notNull(),
});
