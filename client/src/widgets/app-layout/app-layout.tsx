import { Outlet } from 'react-router-dom';
import { Layout, Menu, type MenuProps } from 'antd';
import styles from './app-layout.module.css';
import { serverApi } from '@/shared/api';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/shared/store/slices/server';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const dispatch = useDispatch();
  const  logout = async () => {
    serverApi.logout();
    dispatch(setAuth(false))
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a href="/">Главная</a>,
    },
    {
      key: '2',
      label: <a href="/user/create">Создать пользователя</a>,
    },
    {
      key: '3',
      label: <a onClick={logout} href="/login">Выйти</a>,
    },
  ];
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1>Управление пользователями</h1>
      </Header>

      <Layout>
        <Sider className={styles.sider} width={200}>
          <Menu
            mode="inline"
            items={items}
            className={styles.menu}
          />
        </Sider>

        <Content className={styles.content}>
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;