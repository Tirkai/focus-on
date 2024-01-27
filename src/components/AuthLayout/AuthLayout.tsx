import {FC, ReactNode, useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../store/store';


interface ProtectedRouteProps {
  children: ReactNode;
  isAuthRequired?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children, isAuthRequired = true}) => {
  const [loader, setLoader] = useState(true);
  
  const authStatus = useSelector((state: IRootState) => state.auth.status)
  
  const navigate = useNavigate()
  

  useEffect(() => {
    if (isAuthRequired && authStatus !== isAuthRequired) {
      navigate("/login")
    } else if (!isAuthRequired && authStatus !== isAuthRequired ){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, isAuthRequired, navigate])
  

  return loader ? 'loading...' : <>{children}</>
}

export default ProtectedRoute;