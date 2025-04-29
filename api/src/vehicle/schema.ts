import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { centers } from 'src/center/schema';

export const vehicles = sqliteTable('vehicles', {
	id: integer('id').primaryKey(),
	registration: text('registration').notNull(),
	mileage: real('mileage').notNull(),
	brand: text('brand').notNull(),
	color: text('color').notNull(),
	lastService: text('last_service').notNull(),
	centerId: integer('center_id')
		.notNull()
		.references(() => centers.id, { onDelete: 'cascade' }),
});
