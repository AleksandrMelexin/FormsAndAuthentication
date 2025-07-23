import styles from "./main-page.module.css";
import { mockUsers } from "@/entities/user/model/mock-users";
import type { IUser } from "@/entities/user/model/user-model";
import { useEffect, useState } from "react";
import UsersTable from "@/entities/user/ui/users-table";
import { serverApi } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/shared/store/slices/server";
import { userApi } from "@/entities/user/api";

const MainPage = () => {
  const [users, setUsers] = useState<IUser[]>(mockUsers);
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
      if (typeof resUsers === 'object' && 'error' in resUsers) {
        console.error(resUsers.error);
        return;
      }

      const usersArray = Array.isArray(resUsers) ? resUsers : [resUsers];
      console.log('Users data:', usersArray);
      setUsers(usersArray as IUser[]);
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

