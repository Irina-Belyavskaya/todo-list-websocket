import { logout } from "app/api/auth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthLogOutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        Cookies.remove('jwt_token');
        Cookies.remove('expired_at');
        navigate('/', { replace: true });
      }
    )
  }, [navigate])

  return(<></>);
}