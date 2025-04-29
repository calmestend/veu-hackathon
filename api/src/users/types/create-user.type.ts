import { users } from '../schema';

export type CreateUser = typeof users.$inferInsert;
