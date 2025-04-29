import { vehicles } from '../schema';

export type CreateVehicle = typeof vehicles.$inferInsert;
