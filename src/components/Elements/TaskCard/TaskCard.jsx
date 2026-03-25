import style from "./TaskCard.module.css";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import EditModal from "../EditModal/EditModal";
import {
    differenceInMonths,
    differenceInWeeks,
    differenceInDays,
    differenceInHours,
} from "date-fns";
import taskService from "../../../service/task.service";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../redux/taskSlide";
import { setToast } from "../../../redux/toastSlide";
const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const deadline = () => {
        const now = new Date();
        const dueDate = new Date(task.deadline);

        const diffMs = dueDate - now; // chênh lệch milliseconds
        const diffDays = diffMs / (1000 * 60 * 60 * 24); // đổi sang ngày

        // nếu >= 1 ngày → lấy số nguyên
        if (diffDays >= 1) {
            return Math.floor(diffDays);
        }

        // nếu < 1 ngày → giữ số thập phân (làm tròn 1-2 chữ số)
        return Number(diffDays.toFixed(2));
    };

    function formatDate(dateString) {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat("en-US", {
            month: "short", // Oct
            day: "numeric", // 12
            year: "numeric", // 2023
            hour: "numeric",
            minute: "2-digit",
            hour12: true, // AM/PM
        })
            .format(date)
            .replace(",", " •");
    }

    function getTimeLeft(deadline) {
        const now = new Date();
        const dueDate = new Date(deadline);

        const months = differenceInMonths(dueDate, now);
        if (Math.abs(months) > 0)
            return `${Math.abs(months)} month${Math.abs(months) > 1 ? "s" : ""}`;

        const weeks = differenceInWeeks(dueDate, now);
        if (Math.abs(weeks) > 0)
            return `${Math.abs(weeks)} week${Math.abs(weeks) > 1 ? "s" : ""}`;

        const days = differenceInDays(dueDate, now);
        if (Math.abs(days) > 0)
            return `${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""}`;

        const hours = differenceInHours(dueDate, now);
        return `${Math.abs(hours)} hour${Math.abs(hours) > 1 ? "s" : ""}`;
    }

    const startTask = async () => {
        const payload = {
            id: task?.id,
            state: "in-progress",
        };

        // Gọi API
        const result = await taskService.updateTask(payload);
        if (result.id) {
            dispatch(updateTask(result));

            // Hiển thị toast thành công
            dispatch(
                setToast({
                    show: true,
                    msg: "Task updated successfully!",
                    type: "success",
                }),
            );
        } else {
            dispatch(
                setToast({
                    show: true,
                    msg: "Failed to create task.",
                    type: "error",
                }),
            );
        }
    };

    return (
        <div className="card task-card shadow-sm overdue p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    {task.state === "done" ? (
                        <span
                            className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-1 text-uppercase fw-bold"
                            style={{
                                fontSize: "10px",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Completed
                        </span>
                    ) : null}
                    {task.priority === "urgent" && task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-danger text-white px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            Urgent
                        </span>
                    ) : null}

                    {task.priority === "high" && task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-warning text-dark px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            High Priority
                        </span>
                    ) : null}
                    {task.priority === "normal" && task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-secondary text-white px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            Normal
                        </span>
                    ) : null}
                    {task.priority === "low" && task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-success text-white px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            Low Priority
                        </span>
                    ) : null}
                    {deadline() < 0 && task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-danger-subtle text-danger px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            Overdue
                        </span>
                    ) : null}

                    {deadline() > 0 &&
                    deadline() <= 5 &&
                    task.state !== "done" ? (
                        <span
                            className="badge rounded-pill bg-warning bg-opacity-25 text-warning-emphasis px-3 py-1 text-uppercase fw-bold"
                            style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                        >
                            Due Soon
                        </span>
                    ) : null}

                    <div className="dropdown"></div>
                </div>

                <div className="d-flex gap-1">
                    <EditModal task={task} />
                    <DeleteConfirm task={task} />
                </div>
            </div>
            <h5 className="card-title fw-bold font-headline mb-3">
                {task.title}
            </h5>
            <p
                className="card-text text-muted small "
                style={{ height: "42px" }}
            >
                {task.description.length > 96
                    ? task.description.substring(0, 96)
                    : task.description}
                {task.description.length > 96 ? (
                    <EditModal task={task} readOnly={true} />
                ) : null}
            </p>

            <div className="mt-auto">
                <div
                    className={`d-flex align-items-center gap-2 fw-bold mb-3 ${deadline() < 0 ? "text-danger" : deadline() > 0 && deadline() < 5 ? "text-warning-emphasis" : "text-secondary"}`}
                >
                    {deadline() < 0 ? (
                        <span className="material-symbols-outlined fs-6">
                            event_busy
                        </span>
                    ) : null}
                    {deadline() > 0 && deadline() < 5 ? (
                        <span className="material-symbols-outlined fs-6">
                            schedule
                        </span>
                    ) : null}
                    {deadline() > 5 ? (
                        <span className="material-symbols-outlined fs-6">
                            calendar_month
                        </span>
                    ) : null}{" "}
                    {formatDate(task.deadline)}
                </div>
                <hr className="my-3 opacity-10" />
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <div
                        className={`d-flex align-items-center gap-2 ms-1`}
                        style={{
                            "--dot-color":
                                deadline() < 0
                                    ? "#DC3545"
                                    : deadline() > 0 && deadline() < 5
                                      ? "#664D03"
                                      : "#595C5F",
                        }}
                    >
                        <div className={style.dot_wrapper} id="dotWrapper">
                            <div className={style.ring}></div>
                            <div className={style.ring}></div>
                            <div className={style.dot} id="dot"></div>
                        </div>
                        <span
                            className={`small ${deadline() < 0 ? "text-danger" : deadline() > 0 && deadline() < 5 ? "text-warning-emphasis" : "text-secondary"}`}
                        >
                            {deadline() < 0
                                ? "Overdue"
                                : `Due in ${getTimeLeft(task.deadline)}`}
                        </span>
                    </div>
                    <button
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                        onClick={startTask}
                    >
                        START{" "}
                        <span className="material-symbols-outlined fs-6">
                            play_arrow
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TaskCard;
