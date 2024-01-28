import { FC } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/authService';
import { logout } from '../../store/slices/authSlice';

const LogoutButton: FC = () => {
  const dispatch = useDispatch();

  const lougoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={lougoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
