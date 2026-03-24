import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


const taskService = {

    createTask: async (taskData) => {
        const record = await client.collection('tasks').create(taskData);
        return record;
    },

    getAllTasksByState: async (state) => {
        const records = await client.collection('tasks').getFullList({
            filter: `state = '${state}'`
        });
        return records;
    },
}
export default taskService;