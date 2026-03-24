import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


const taskService = {

    createTask: async (taskData) => {
        try {
            const record = await client.collection('tasks').create(taskData);
            return record;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    getAllTasks: async () => {
        try {
            const records = await client.collection('tasks').getFullList();
            return records;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },
}
export default taskService;