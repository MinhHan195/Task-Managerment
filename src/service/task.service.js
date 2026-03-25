import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


const taskService = {

    createTask: async (taskData) => {
        const record = await client.collection('tasks').create(taskData);
        return record;
    },

    updateTask: async (taskData) => {
        const record = await client.collection('tasks').update(taskData.id, taskData);
        return record;
    },

    deleteTask: async (taskId) => {
        const result = await client.collection('tasks').delete(taskId);
        return result;
    },

    getAllTasksByState: async (state) => {
        const records = await client.collection('tasks').getFullList({
            filter: `state = '${state}'`
        }, { requestKey: null });
        return records;
    },
}
export default taskService;