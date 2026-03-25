import DefaultLayout from "../../layouts/defaultLayout/defaultLayout";
import style from "./dashBoard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { deleteTask, fetchTasks } from "../../redux/taskSlide";
import taskService from "../../service/task.service";
import { setToast } from "../../redux/toastSlide";
import Chart from "chart.js/auto";

const DashBoard = () => {
    const dispatch = useDispatch();
    const todoTasks = useSelector((state) => state.task.todo);
    const inprogressTasks = useSelector((state) => state.task.inprogress);
    const doneTasks = useSelector((state) => state.task.done);
    const [highPriorityTasks, setHighPriorityTasks] = useState([]);
    const chartInstanceRef = useRef(null);
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        overduteTasks: 0,
    });
    const getGreeting = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Night";
        }
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

    const handleDelete = async (task) => {
        try {
            const result = await taskService.deleteTask(task.id);
            console.log(result);
            if (result) {
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
            dispatch(
                setToast({
                    msg: "Error deleting task",
                    type: "error",
                    show: true,
                }),
            );
        }
    };

    const calculateStats = () => {
        const total =
            todoTasks.length + inprogressTasks.length + doneTasks.length;
        const completed = doneTasks.length;
        const overdue = [...todoTasks, ...inprogressTasks].filter((task) => {
            const deadline = new Date(task.deadline);
            const now = new Date();
            return deadline < now;
        }).length;

        setStats({
            totalTasks: total,
            completedTasks: completed,
            overduteTasks: overdue,
        });
    };

    const getHighPriorityTasks = () => {
        // Lọc tasks có priority cao (urgent, high) và chưa hoàn thành
        const allTasks = [...todoTasks, ...inprogressTasks];
        const filtered = allTasks.filter((task) => {
            return task.priority === "urgent" || task.priority === "high";
        });

        // Sắp xếp theo deadline (sớm nhất trước)
        const sorted = filtered.sort((a, b) => {
            const deadlineA = new Date(a.deadline).getTime();
            const deadlineB = new Date(b.deadline).getTime();
            return deadlineA - deadlineB;
        });
        setHighPriorityTasks(sorted);
    };

    useEffect(() => {
        dispatch(fetchTasks("to-do"));
        dispatch(fetchTasks("in-progress"));
        dispatch(fetchTasks("done"));
    }, [dispatch]);

    useEffect(() => {
        calculateStats();
        getHighPriorityTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoTasks, inprogressTasks, doneTasks]);

    useEffect(() => {
        // Delay để đảm bảo canvas đã render
        const timer = setTimeout(() => {
            updateChart();
        }, 100);

        return () => clearTimeout(timer);
    }, [todoTasks, inprogressTasks, doneTasks]);

    function updateChart() {
        const counts = {
            todo: todoTasks.length,
            "in-progress": inprogressTasks.length,
            done: doneTasks.length,
        };

        const chartCanvas = document.getElementById("distributionChart");
        if (!chartCanvas) return;

        const ctx = chartCanvas.getContext("2d");

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
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
                            {getGreeting()}, Minh Han
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
                                <div className="h2 fw-bold mb-0">
                                    {stats.totalTasks}
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
                                <div className="h2 fw-bold mb-0">
                                    {stats.completedTasks}
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
                                <div className="h2 fw-bold mb-0">
                                    {stats.overduteTasks}
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
                                {highPriorityTasks
                                    ? highPriorityTasks.map((task) => (
                                          <div
                                              className={`${style.task_item} shadow-sm`}
                                              key={task.id}
                                          >
                                              <div className="d-flex align-items-center justify-content-between">
                                                  <div className="d-flex align-items-center gap-3">
                                                      <div
                                                          className={`p-2 rounded-3 bg-light ${task.priority === "urgent" ? "text-danger" : "text-warning "} `}
                                                      >
                                                          <span className="material-symbols-outlined">
                                                              schedule
                                                          </span>
                                                      </div>
                                                      <div>
                                                          <div
                                                              className={`"fw-bold ${task.priority === "urgent" ? "text-danger" : "text-warning "}`}
                                                          >
                                                              {task.title}
                                                          </div>
                                                          <div className="small text-secondary">
                                                              Due:{" "}
                                                              {formatDate(
                                                                  task.deadline,
                                                              )}
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
                                                                  onClick={() =>
                                                                      handleDelete(
                                                                          task,
                                                                      )
                                                                  }
                                                              >
                                                                  Delete
                                                              </a>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                    : null}
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
export default DashBoard;
