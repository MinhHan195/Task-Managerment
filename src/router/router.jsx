import { BrowserRouter, Routes, Route } from "react-router";
import DashBoard from "../pages/dashBoard/dashBoard";
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashBoard />} />
            </Routes>
            {/* <Routes>
                <Route path="/todolist" element={<TodoList />} />
            </Routes>
            <Routes>
                <Route path="/in-progress" element={<InProgress />} />
            </Routes>
            <Routes>
                <Route path="/done" element={<Done />} />
            </Routes> */}
        </BrowserRouter>
    );
}
export default AppRouter;
