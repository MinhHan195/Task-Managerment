import style from "./TaskCard.module.css";
const TaskCard = () => {
    return (
        <div className="card task-card shadow-sm overdue p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    {/* <span
                        className="badge rounded-pill bg-danger text-white px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        Urgent
                    </span> */}
                    <span
                        className="badge rounded-pill bg-warning text-dark px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        High Priority
                    </span>
                    {/* <span
                        className="badge rounded-pill bg-success text-white px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        Low Priority
                    </span> */}

                    {/* <span
                        className="badge rounded-pill bg-danger-subtle text-danger px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        Overdue
                    </span> */}
                    {/* <span
                        className="badge rounded-pill bg-warning bg-opacity-25 text-warning-emphasis px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        Due Soon
                    </span> */}

                    {/* <span
                        className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-1 text-uppercase fw-bold"
                        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                        Completed
                    </span> */}
                    <div class="dropdown"></div>
                </div>

                <div className="d-flex gap-1">
                    <button
                        className="btn btn-link btn-sm text-secondary p-1"
                        title="Edit Task"
                    >
                        <span className="material-symbols-outlined fs-5">
                            edit_note
                        </span>
                    </button>
                    <button
                        className="btn btn-link btn-sm text-danger p-1"
                        title="Delete Task"
                    >
                        <span className="material-symbols-outlined fs-5">
                            delete
                        </span>
                    </button>
                </div>
            </div>
            <h5 className="card-title fw-bold font-headline mb-3">
                Client Proposal Refinement
            </h5>
            <p className="card-text text-muted small mb-4">
                Update the financial section of the Q4 proposal before the
                internal review meeting.
            </p>
            <div className="mt-auto">
                <div
                    className="d-flex align-items-center gap-2 text-danger fw-bold mb-3"
                    // style="font-size: 12px;"
                >
                    <span className="material-symbols-outlined fs-6">
                        event_busy
                    </span>{" "}
                    Oct 12, 2023 • 2:00 PM
                </div>
                <hr className="my-3 opacity-10" />
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <div
                        className={`d-flex align-items-center gap-2 ms-1`}
                        style={{ "--dot-color": "#595C5F" }}
                        // #664D03 - text-warning-emphasis
                        // #FFC107 - text-warning
                        // #595C5F - text-secondary
                    >
                        <div className={style.dot_wrapper} id="dotWrapper">
                            <div className={style.ring}></div>
                            <div className={style.ring}></div>
                            <div className={style.dot} id="dot"></div>
                        </div>
                        <span className="text-secondary small">
                            Overdue by 3 days
                        </span>
                    </div>
                    <button
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                        // style="font-size: 11px;"
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
