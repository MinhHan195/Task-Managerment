import TaskCard from "../TaskCard/TaskCard";
const TaskList = () => {
    return (
        <>
            {/* Task Grid  */}
            <div className="row g-4">
                {/* Overdue Task */}
                <div className="col-12 col-md-6 col-lg-4">
                    <TaskCard />
                </div>
            </div>
        </>
    );
};
export default TaskList;
