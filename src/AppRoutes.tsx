import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./common/constant";
import { UserList } from "./components/UserList";

export const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate to={NavigationRoutes.HomePage} />} />
    <Route path={NavigationRoutes.HomePage} element={<UserList />} />
  </Routes>
);
