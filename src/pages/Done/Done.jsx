import DefaultLayout from "../../layouts/defaultLayout/defaultLayout";
import TaskList from "../../components/Elements/TaskList/TaskList";
import { fetchTasks } from "../../redux/taskSlide";
import { useDispatch, useSelector } from "react-redux";
import style from "./Done.module.css";
import { useEffect } from "react";
import SortBtn from "../../components/Elements/SortBtn/SortBtn";
const Done = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.done);
    const filteredTasks = useSelector((state) => state.task.filteredDone);
    
    // Ưu tiên hiển thị filtered tasks, nếu không có thì hiển thị done gốc
    const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

    useEffect(() => {
        dispatch(fetchTasks("done"));
    }, [dispatch]);

    return (
        <DefaultLayout>
            <main className={`${style["main_content"]}`}>
                <div className="container-fluid">
                    {/* Header Section  */}
                    <div className="row align-items-end mb-4 g-4">
                        <div className="col-md-7">
                            <h1 className="display-5 fw-bold font-headline mb-2">
                                Task Completed
                            </h1>
                            <p className="text-muted fs-5">
                                Great! You have completed {displayTasks.length} tasks.
                            </p>
                        </div>
                        <div className="col-md-5 d-flex justify-content-md-end gap-3 align-items-center">
                            <SortBtn />
                            <button
                                className={`btn ${style.btn_primary_custom} shadow d-sm-none d-flex align-items-center gap-2 px-4`}
                                data-bs-target="#addTaskModal"
                                data-bs-toggle="modal"
                            >
                                <span className="material-symbols-outlined fs-5">
                                    add_task
                                </span>{" "}
                                Add New Task
                            </button>
                        </div>
                    </div>
                    {/* Quick Search & Filter Mobile (Visible on small screens) */}
                    {/* <div className="row d-md-none mb-4">
                        <div className="col-12">
                            <div className="search-container d-flex align-items-center w-100 bg-white border">
                                <span className="material-symbols-outlined text-secondary fs-5">
                                    search
                                </span>
                                <input
                                    className="form-control form-control-sm"
                                    placeholder="Search tasks..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div> */}
                    {/* Task Grid  */}
                    <TaskList list={displayTasks} />
                </div>
            </main>
            {/* Create Task Modal  */}
        </DefaultLayout>
    );
};
export default Done;
