import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/main-page";
import Error404Page from "@pages/error404-page/";
import EditUserPage from "@/pages/edit-user-page";
import CreateUserPage from "@/pages/create-user-page";
import LoginPage from "@/pages/login-page";
import AppLayout from "@/widgets/app-layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/:id" element={<EditUserPage />} />
          <Route path="/user/create" element={<CreateUserPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
