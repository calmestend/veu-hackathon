import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const centers = sqliteTable('centers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  latitude: real('latitude').notNull(),
  longitud: real('longitud').notNull(),
});
