import style from "./SortBtn.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    sortTasksByDeadline,
    sortTasksByPriority,
    sortTasksByTitle,
} from "../../../redux/taskSlide";
const SortBtn = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.task.sortState);
    return (
        <div className="dropdown">
            <button
                className="btn btn-light border bg-white px-4 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2 "
                data-bs-toggle="dropdown"
                type="button"
            >
                <span className="material-symbols-outlined fs-6">sort</span>{" "}
                Sort by: {state}
            </button>
            <ul
                className={`dropdown-menu dropdown-menu-end rounded-3 shadow border-0 mt-2 ${style.dropdown_menu}`}
            >
                <li
                    onClick={() => {
                        dispatch(sortTasksByDeadline());
                    }}
                >
                    <a className="dropdown-item py-2" href="#">
                        Due Date (Earliest)
                    </a>
                </li>
                <li
                    onClick={() => {
                        dispatch(sortTasksByPriority());
                    }}
                >
                    <a className="dropdown-item py-2" href="#">
                        Priority (High to Low)
                    </a>
                </li>
                <li
                    onClick={() => {
                        dispatch(sortTasksByTitle());
                    }}
                >
                    <a className="dropdown-item py-2" href="#">
                        Alphabetical
                    </a>
                </li>
            </ul>
        </div>
    );
};
export default SortBtn;
