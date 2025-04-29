import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { users } from 'src/users/schema';
import { vehicles } from 'src/vehicle/schema';

export const dates = sqliteTable('dates', {
	id: integer('id').primaryKey(),
	startTime: real('start_time').notNull(),
	endTime: real('end_time').notNull(),
	driverId: integer('driver_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	vehicleId: integer('vehicle_id')
		.notNull()
		.references(() => vehicles.id, { onDelete: 'cascade' }),
});
