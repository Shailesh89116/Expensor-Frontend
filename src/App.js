import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import { setUser } from "./store/auth.js";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [name,setName]=useState('');
  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        const user = await res.json();
      if (res.ok) {      
        dispatch(setUser(user));
      }
    } catch (error) {
      console.log("App.js ka",error)
    }
    setIsLoading(false);
  }

  
  useEffect(() => {
    fetchUser;
  }, []);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <AppBar/>
      <Outlet />
    </>
  );
}

export default App;