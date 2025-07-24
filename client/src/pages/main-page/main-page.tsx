import styles from "./main-page.module.css";
import type { IUser } from "@/entities/user/model/user-model";
import { useEffect, useState } from "react";
import UsersTable from "@/entities/user/ui/users-table";
import { serverApi } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/shared/store/slices/server";
import { userApi } from "@/entities/user/api";

const MainPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const resAuth = await serverApi.checkAuth();
    if (("error" in resAuth)) {
      console.error(resAuth.error);
    } else {
      if (resAuth.status === 200) {
        dispatch(setAuth(true));
      } else {
        navigate("/login");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const resUsers = await userApi.getUsers();
      if ('error' in resUsers) {
        console.error(resUsers.error);
      } else {
        setUsers(resUsers as IUser[]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await checkAuth(); 
      await fetchUsers(); 
    };
    loadData();
  }, [])
  return (
    <main>
      <UsersTable gotUsers={users} />
    </main>
  );
};

export default MainPage;

