import { users } from '../schema';

export type SelectUser = typeof users.$inferSelect;
