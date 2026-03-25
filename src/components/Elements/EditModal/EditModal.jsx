import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/toastSlide";
import { updateTask } from "../../../redux/taskSlide";
import taskService from "../../../service/task.service";
import style from "./EditModal.module.css";
const EditModal = ({ task, readOnly }) => {
    const modalId = `deleteModal-${task?.id}-${readOnly ? "readOnly" : null}`;
    const closeButtonId = `btn-close-${task?.id}-${readOnly ? "readOnly" : null}`;

    const [taskTitle, setTaskTitle] = useState(task?.title || "");
    const [taskDescription, setTaskDescription] = useState(
        task?.description || "",
    );
    const [taskDeadline, setTaskDeadline] = useState(task?.deadline || "");
    const [taskState, setTaskState] = useState(task?.state || "to-do");
    const [taskPriority, setTaskPriority] = useState(
        task?.priority || "normal",
    );

    const [showTitleError, setShowTitleError] = useState(false);
    const [showDescriptionError, setShowDescriptionError] = useState(false);
    // const [taskAttachment, setTaskAttachment] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        // Validation
        if (taskTitle.trim() === "") {
            setShowTitleError(true);
        } else {
            setShowTitleError(false);
        }

        if (taskDescription.trim() === "") {
            setShowDescriptionError(true);
        } else {
            setShowDescriptionError(false);
        }

        if (taskTitle.trim() === "" || taskDescription.trim() === "") {
            return;
        }

        // Convert sang Date
        const date = new Date(taskDeadline);
        const DateConverted = date.toISOString();

        // Tạo payload
        const payload = {
            id: task?.id,
            title: taskTitle.trim(),
            description: taskDescription.trim(),
            deadline: DateConverted,
            state: taskState,
            priority: taskPriority,
        };

        // Gọi API
        const result = await taskService.updateTask(payload);
        console.log(result);
        if (result.id) {
            dispatch(updateTask(result));

            // Đóng modal
            const btnClose = document.getElementById(closeButtonId);
            btnClose.click();

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

    const formatForInput = (date) => {
        const d = new Date(date);

        const offset = d.getTimezoneOffset() * 60000;
        const local = new Date(d.getTime() - offset);

        return local.toISOString().slice(0, 16);
    };

    function handlePrioritySelect(e) {
        e.stopPropagation();
        document.querySelectorAll(`.priority_btn`).forEach((btn) => {
            if (
                btn !== e.target &&
                !btn.classList.contains(`${style.btn_unselect_custom}`)
            ) {
                btn.classList.add(`${style.btn_unselect_custom}`);
            }
        });
        if (e.target.classList.contains(`.priority_btn`)) {
            e.target.classList.toggle(`${style.btn_unselect_custom}`);
        } else {
            e.target
                .closest(".priority_btn")
                .classList.toggle(`${style.btn_unselect_custom}`);
        }
    }

    return (
        <>
            {readOnly ? (
                <span
                    className="text-primary "
                    data-bs-target={`#${modalId}`}
                    data-bs-toggle="modal"
                    style={{ cursor: "pointer" }}
                >
                    ...Xem thêm
                </span>
            ) : (
                <button
                    className="btn btn-link btn-sm text-secondary p-1"
                    title="Edit Task"
                    data-bs-target={`#${modalId}`}
                    data-bs-toggle="modal"
                    type="button"
                >
                    <span className="material-symbols-outlined fs-5">
                        edit_note
                    </span>
                </button>
            )}
            <div className="modal fade" id={modalId} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-4 border-0 p-3">
                        <div className="modal-header border-0 pb-0 d-flex justify-content-center position-relative">
                            <h5 className="modal-title font-headline fw-bold fs-4">
                                {readOnly ? "Task Detail" : "Update Task"}
                            </h5>
                            <button
                                className="btn-close position-absolute end-0 top-0 m-3"
                                data-bs-dismiss="modal"
                                type="button"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-4 position-relative">
                                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                        Task Title
                                    </label>
                                    <input
                                        className="form-control form-control-lg bg-light border-0 fs-6 py-3"
                                        placeholder="e.g. Design meeting with stakeholders"
                                        type="text"
                                        value={taskTitle}
                                        onChange={(e) => {
                                            setTaskTitle(e.target.value);
                                        }}
                                        disabled={readOnly ? true : false}
                                    />
                                    {showTitleError && (
                                        <div
                                            className={`${style.invalid_feedback} mt-2 text-danger `}
                                        >
                                            Please fill out this field.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4 position-relative">
                                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control bg-light border-0 fs-6 py-3"
                                        placeholder="Add some context or specific sub-tasks..."
                                        rows="4"
                                        defaultValue={taskDescription}
                                        onChange={(e) => {
                                            setTaskDescription(e.target.value);
                                        }}
                                        disabled={readOnly}
                                    ></textarea>
                                    {showDescriptionError && (
                                        <div
                                            className={`${style.invalid_feedback} mt-2 text-danger `}
                                        >
                                            Please fill out this field.
                                        </div>
                                    )}
                                </div>
                                {/* <div className="mb-4 position-relative">
                                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                        Attachments
                                    </label>
                                    <input
                                        id="file-upload"
                                        className={style.input_file}
                                        accept="
                                            image/*,
                                            .pdf,
                                            .docx,
                                            .pptx,
                                            .mp3,
                                            .zip,
                                            application/pdf,
                                            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                            audio/mpeg,
                                            application/zip
                                            "
                                        type="file"
                                        multiple
                                        onChange={setAttachmentHandle}
                                    />
                                    {taskAttachment
                                        ? taskAttachment.map((file) => {
                                              return (
                                                  <div
                                                      className={
                                                          style.file_card
                                                      }
                                                  >
                                                      <span> {file.name}</span>
                                                      <div
                                                          
                                                      >
                                                          <i class="bi bi-x"></i>
                                                      </div>
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div> */}
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                            Deadline (Date &amp; Time)
                                        </label>
                                        <div className="input-group">
                                            <input
                                                className="form-control bg-light border-0 fs-6 py-3"
                                                type="datetime-local"
                                                defaultValue={
                                                    taskDeadline
                                                        ? formatForInput(
                                                              taskDeadline,
                                                          )
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setTaskDeadline(
                                                        e.target.value,
                                                    );
                                                }}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                            State
                                        </label>
                                        <select
                                            className="form-select bg-light border-0 fs-6 py-3"
                                            value={taskState}
                                            onChange={(e) => {
                                                setTaskState(e.target.value);
                                            }}
                                            disabled={readOnly}
                                        >
                                            <option value="to-do">To Do</option>
                                            <option value="in-progress">
                                                In Progress
                                            </option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2 row g-2">
                                    <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                                        Priority Level
                                    </label>
                                    <div className="col-lg-3 col-6">
                                        <button
                                            className={`btn btn-outline-danger ${taskPriority === "urgent" ? null : style.btn_unselect_custom} priority_btn w-100 py-3 bg-danger bg-opacity-25 text-danger`}
                                            onClick={(e) => {
                                                handlePrioritySelect(e);
                                                setTaskPriority("urgent");
                                            }}
                                            type="button"
                                            disabled={readOnly}
                                        >
                                            <div
                                                className={`${style.priority_circle} bg-danger`}
                                            ></div>{" "}
                                            Urgent
                                        </button>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <button
                                            className={`btn btn-outline-warning ${taskPriority === "high" ? null : style.btn_unselect_custom} priority_btn w-100 py-3 bg-warning bg-opacity-25 text-warning`}
                                            onClick={(e) => {
                                                handlePrioritySelect(e);
                                                setTaskPriority("high");
                                            }}
                                            type="button"
                                            disabled={readOnly}
                                        >
                                            <div
                                                className={`${style.priority_circle} bg-warning`}
                                            ></div>{" "}
                                            High Priority
                                        </button>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <button
                                            className={`btn btn-outline-secondary ${taskPriority === "normal" ? null : style.btn_unselect_custom} priority_btn w-100 py-3 bg-secondary bg-opacity-25 text-secondary`}
                                            onClick={(e) => {
                                                handlePrioritySelect(e);
                                                setTaskPriority("normal");
                                            }}
                                            type="button"
                                            disabled={readOnly}
                                        >
                                            <div
                                                className={`${style.priority_circle} bg-secondary`}
                                            ></div>{" "}
                                            Normal
                                        </button>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <button
                                            className={`btn btn-outline-success ${taskPriority === "low" ? null : style.btn_unselect_custom} priority_btn w-100 py-3 bg-success bg-opacity-25 text-success`}
                                            onClick={(e) => {
                                                handlePrioritySelect(e);
                                                setTaskPriority("low");
                                            }}
                                            type="button"
                                            disabled={readOnly}
                                        >
                                            <div
                                                className={`${style.priority_circle} bg-success`}
                                            ></div>{" "}
                                            Low Priority
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0 pt-0 mt-3">
                            <button
                                className="btn btn-link text-decoration-none text-muted fw-bold me-auto px-0"
                                data-bs-dismiss="modal"
                                type="button"
                                id={closeButtonId}
                            >
                                Cancel
                            </button>
                            {readOnly ? null : (
                                <button
                                    className={`btn ${style.btn_primary_custom} px-5 py-3 shadow-lg`}
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={readOnly}
                                >
                                    Update Task
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditModal;
