import DefaultLayout from "../../layouts/defaultLayout/defaultLayout";
import TaskList from "../../components/Elements/TaskList/TaskList";
import { fetchTasks } from "../../redux/taskSlide";
import { useDispatch, useSelector } from "react-redux";
import style from "./Done.module.css";
import { useEffect } from "react";
const Done = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.done);

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
                                Great! You have completed {tasks.length} tasks.
                            </p>
                        </div>
                        <div className="col-md-5 d-flex justify-content-md-end gap-3 align-items-center">
                            <div className="dropdown">
                                <button
                                    className="btn btn-light border bg-white px-4 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2 "
                                    data-bs-toggle="dropdown"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined fs-6">
                                        sort
                                    </span>{" "}
                                    Sort by: Date
                                </button>
                                <ul
                                    className={`dropdown-menu dropdown-menu-end rounded-3 shadow border-0 mt-2 ${style.dropdown_menu}`}
                                >
                                    <li>
                                        <a
                                            className="dropdown-item py-2"
                                            href="#"
                                        >
                                            Due Date (Earliest)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item py-2"
                                            href="#"
                                        >
                                            Priority (High to Low)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item py-2"
                                            href="#"
                                        >
                                            Alphabetical
                                        </a>
                                    </li>
                                </ul>
                            </div>
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
                    <TaskList list={tasks} />
                </div>
            </main>
            {/* Create Task Modal  */}
        </DefaultLayout>
    );
};
export default Done;
