/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
const TaskList = ({ list }) => {
    useEffect(() => {
        console.log(list);
    }, [list]);
    return (
        <>
            {/* Task Grid  */}
            <div className="row g-4">
                {/* Overdue Task */}
                {list.length > 0
                    ? list.map((task, index) => {
                          return (
                              <div
                                  className="col-12 col-md-6 col-lg-4"
                                  key={task.id}
                              >
                                  <TaskCard task={task} />
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
};
export default TaskList;
