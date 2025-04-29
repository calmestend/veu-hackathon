import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { users } from 'src/users/schema';

export const travels = sqliteTable('travels', {
	id: integer('id').primaryKey(),
	price: real('price').notNull(),
	clientId: integer('client_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	driverId: integer('driver_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
});
