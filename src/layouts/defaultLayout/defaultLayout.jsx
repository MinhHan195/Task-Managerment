import style from "./defaultLayout.module.css";
import { useNavigate, NavLink } from "react-router-dom";
const defaultLayout = (props) => {
    const navigate = useNavigate();

    const showMenuHandler = () => {
        document.getElementById(style.sidebar).classList.toggle(style.show);
        console.log(document.getElementById(style.sidebar));
    };

    return (
        <>
            <aside className={style.sidebar} id={style.sidebar}>
                <div className="px-4 mb-4" onClick={showMenuHandler}>
                    <h2 className="h4 mb-0 fw-bold text-primary">TaskFlow</h2>
                    <small className="text-muted">Management Workspace</small>
                </div>
                <div
                    className={`search-wrapper ${style.search_wrapper} ${style.search_wrapper_sidebar} px-2 mb-4`}
                >
                    <span
                        className="material-symbols-outlined"
                        id={style.material_symbols_outlined}
                    >
                        search
                    </span>
                    <input
                        className={`form-control ${style.search_input}`}
                        placeholder="Search tasks..."
                        type="text"
                    />
                </div>
                <nav className="nav flex-column mb-auto">
                    <NavLink
                        to="/"
                        className={`${style.nav_link} ${style.active}`}
                    >
                        <span className="material-symbols-outlined">
                            dashboard
                        </span>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/todolist" className={`${style.nav_link}`}>
                        <span className="material-symbols-outlined">
                            list_alt
                        </span>
                        <span>Todo</span>
                    </NavLink>
                    <NavLink to="/in-progress" className={`${style.nav_link}`}>
                        <span className="material-symbols-outlined">
                            pending_actions
                        </span>
                        <span>In Progress</span>
                    </NavLink>
                    <NavLink to="/done" className={`${style.nav_link}`}>
                        <span className="material-symbols-outlined">
                            check_circle
                        </span>
                        <span>Done</span>
                    </NavLink>
                </nav>
            </aside>
            <div className={style.main_wrapper}>
                <header
                    className={`${style.top_navbar} d-flex align-items-center px-4`}
                >
                    <div className="container-fluid d-flex justify-content-between align-items-center p-0">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn d-lg-none p-0 me-2"
                                onClick={showMenuHandler}
                            >
                                <span className="material-symbols-outlined">
                                    menu
                                </span>
                            </button>
                            <span
                                className={`h4 mb-0 fw-bold text-primary ${style.title}`}
                            >
                                TaskFlow
                            </span>
                            <div
                                className={`search-wrapper ${style.search_wrapper}`}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    id={style.material_symbols_outlined}
                                >
                                    search
                                </span>
                                <input
                                    className={`form-control ${style.search_input}`}
                                    placeholder="Search tasks..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            {/* <button
                                className={`btn text-white ${style.btn_primary} d-none d-sm-block`}
                                data-bs-target="#addTaskModal"
                                data-bs-toggle="modal"
                            >
                                Add Task
                            </button> */}
                            <div className="position-relative">
                                <span className="material-symbols-outlined text-secondary cursor-pointer">
                                    notifications
                                </span>
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                            </div>
                            <img
                                alt="User"
                                className={`${style.avatar} border ms-2`}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTuGUXL6aSyaL9-SQ1owwt6iJlBrnX811xCwhZLrOZyo5IkanACc1hGF5qWYKLXGDhGLbIJLUI-SKM266UuZYbDpipxHqWHOee1sUQUd5Gs2L_Q_NMjDSs2LU64B8cvdF8D3apyWmbMEEsxFIoKRoUn8vpSztvp3xELt1WvS5C8ahI0z7jhnu94sfAqLVMrVJg0pA0yFTPvZRPRogemJyT8sXe4y6wKh13aOWc3HKLcGYU48jVAsZb3480akaaMo83xFdSD6-ss9s"
                            />
                        </div>
                    </div>
                </header>
                <div>{props.children}</div>
            </div>
        </>
    );
};
export default defaultLayout;
