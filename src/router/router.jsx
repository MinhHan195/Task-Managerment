import { BrowserRouter, Routes, Route } from "react-router";
import DashBoard from "../pages/dashBoard/dashBoard";
import ToDo from "../pages/toDo/toDo";
import InProgress from "../pages/InProgress/InProgress";
import Done from "../pages/Done/Done";
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/todolist" element={<ToDo />} />
                <Route path="/in-progress" element={<InProgress />} />
                <Route path="/done" element={<Done />} />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;
