import * as userSchema from '../users/schema';
import * as centerSchema from '../center/schema';
import * as travelSchema from '../travel/schema';
import * as driverReportSchema from '../driver_report/schema';
import * as vehicleSchema from '../vehicle/schema';
import * as dateSchema from '../date/schema';

export const schemas = {
	...userSchema,
	...centerSchema,
	...travelSchema,
	...driverReportSchema,
	...vehicleSchema,
	...dateSchema,
};

export type DatabaseSchema = typeof schemas;
