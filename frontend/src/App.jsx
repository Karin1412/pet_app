import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Sidebar from "./components/common/SideBar"
import RightPanel from "./components/common/RightPanel"

function App() {
  

  return (
    <div className="flex ">
      
      <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
