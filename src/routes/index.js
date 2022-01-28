/* eslint-disable keyword-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable padded-blocks */
/* eslint-disable react/jsx-indent */
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

function AppRouter () {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
        </Routes>

    );
}

export default AppRouter;