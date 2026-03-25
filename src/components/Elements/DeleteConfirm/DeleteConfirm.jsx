import taskService from "../../../service/task.service";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/taskSlide";
import { setToast } from "../../../redux/toastSlide";
const DeleteConfirm = ({ task }) => {
    const dispatch = useDispatch();
    const modalId = `deleteModal-${task.id}`;
    const closeButtonId = `btn-close-${task.id}`;

    const handleDelete = async () => {
        try {
            const result = await taskService.deleteTask(task.id);
            console.log(result);
            if (result) {
                const closeButton = document.getElementById(closeButtonId);
                if (closeButton) {
                    closeButton.click();
                }
                dispatch(deleteTask(task));
                dispatch(
                    setToast({
                        msg: "Task deleted successfully",
                        type: "success",
                        show: true,
                    }),
                );
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            const closeButton = document.getElementById(closeButtonId);
            if (closeButton) {
                closeButton.click();
            }
            dispatch(
                setToast({
                    msg: "Error deleting task",
                    type: "error",
                    show: true,
                }),
            );
        }
    };

    return (
        <>
            <button
                className="btn btn-link btn-sm text-danger p-1"
                title="Delete Task"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                type="button"
            >
                <span className="material-symbols-outlined fs-5">delete</span>
            </button>

            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={`${modalId}-label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id={`${modalId}-label`}
                            >
                                Do you want to delete this task?
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete the task "
                                {task.title}"?
                            </p>
                        </div>
                        <div className="modal-footer ">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                id={closeButtonId}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DeleteConfirm;
