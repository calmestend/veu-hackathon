import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const name = formData.get('name');

		if (!name || typeof name !== 'string') {
			return { success: false, message: 'Name is required' };
		}

		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name })
			});

			if (!response.ok) {
				throw new Error('Failed to create driver');
			}

			const result = await response.json();

			return { success: true, driver: result };
		} catch (error) {
			console.error(error);
			return { success: false, message: 'An error occurred while creating the driver' };
		}
	}
};

