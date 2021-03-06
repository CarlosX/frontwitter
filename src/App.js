import React, {useState, useEffect} from 'react';
import SignInSingUp from "./page/SigninSingup";
import { ToastContainer } from "react-toastify";
/* Utils */
import { AuthContext } from "./utils/context";
/* Auth */
import { isUserLogedApi } from "./api/auth";
/* Routes */
import Routing from "./routes/Routing";

export default function App() {

  const [user, setUser] = useState(null)
  const [loadUser, setLoadUser] = useState(false)
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLogedApi())
    setLoadUser(true)
    setRefreshCheckLogin(false)
  }, [refreshCheckLogin])

  if(!loadUser) return null

  return (
    <AuthContext.Provider value={user}>
      { user ? (
        <Routing
          setRefreshCheckLogin={setRefreshCheckLogin}
        />
      ) : (
        <SignInSingUp setRefreshCheckLogin={setRefreshCheckLogin} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}