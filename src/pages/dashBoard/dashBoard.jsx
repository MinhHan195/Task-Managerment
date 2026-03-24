import DefaultLayout from "../../layouts/defaultLayout/defaultLayout";
import style from "./dashBoard.module.css";
const dashBoard = () => {
    function updateChart(tasks) {
        const counts = {
            todo: tasks.filter((t) => t.status === "todo").length,
            "in-progress": tasks.filter((t) => t.status === "in-progress")
                .length,
            done: tasks.filter((t) => t.status === "done").length,
        };

        const ctx = document
            .getElementById("distributionChart")
            .getContext("2d");
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Todo", "In Progress", "Done"],
                datasets: [
                    {
                        data: [
                            counts["todo"],
                            counts["in-progress"],
                            counts["done"],
                        ],
                        backgroundColor: ["#e2e8f0", "#0056D2", "#10b981"],
                        borderWidth: 0,
                        cutout: "70%",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            font: { family: "Inter", size: 11 },
                        },
                    },
                },
            },
        });
    }

    return (
        <DefaultLayout>
            <main className="container-fluid p-4 p-lg-5">
                {/* Dashboard View*/}
                <section>
                    <div className="mb-5">
                        <h1 className="display-6 fw-bold mb-1">
                            Good Morning, Alex
                        </h1>
                        <p className="text-secondary">
                            Here's an overview of your productivity today.
                        </p>
                    </div>
                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className={style.stat_card}>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                                        <span className="material-symbols-outlined">
                                            assignment
                                        </span>
                                    </div>
                                </div>
                                <div className="small text-secondary fw-medium mb-1">
                                    Total Tasks
                                </div>
                                <div
                                    className="h2 fw-bold mb-0"
                                    id="stat-total"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={style.stat_card}>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                                        <span className="material-symbols-outlined">
                                            check_circle
                                        </span>
                                    </div>
                                </div>
                                <div className="small text-secondary fw-medium mb-1">
                                    Completed
                                </div>
                                <div
                                    className="h2 fw-bold mb-0"
                                    id="stat-completed"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={style.stat_card}>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 rounded-3 bg-danger bg-opacity-10 text-danger">
                                        <span className="material-symbols-outlined">
                                            event_busy
                                        </span>
                                    </div>
                                </div>
                                <div className="small text-secondary fw-medium mb-1">
                                    Overdue
                                </div>
                                <div
                                    className="h2 fw-bold mb-0"
                                    id="stat-overdue"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h4 mb-0">Recent Priorities</h2>
                            </div>
                            <div id="recent-tasks-container">
                                {/* Tasks dynamically injected here */}
                                {/* <div class="text-center py-5 text-muted">
                                    No tasks found in this category.
                                </div> */}
                                <div className="task-item shadow-sm">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="p-2 rounded-3 bg-light ${statusColor}">
                                                <span className="material-symbols-outlined">
                                                    {/* ${statusIcon} */}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="fw-bold">
                                                    {/* ${task.name} */}
                                                </div>
                                                <div className="small text-secondary">
                                                    Due: {/* ${task.date} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-link text-secondary p-0"
                                                data-bs-toggle="dropdown"
                                            >
                                                <span className="material-symbols-outlined">
                                                    more_vert
                                                </span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                                                <li>
                                                    <a
                                                        className="dropdown-item small"
                                                        // onClick={() => deleteTask(task.id)}
                                                    >
                                                        Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={style.stat_card}>
                                <h2 className="h6 fw-bold mb-4">
                                    Task Distribution
                                </h2>
                                <div style={{ height: "250px" }}>
                                    <canvas id="distributionChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </DefaultLayout>
    );
};
export default dashBoard;
