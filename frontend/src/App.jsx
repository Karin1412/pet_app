import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import Sidebar from "./components/common/SideBar"
import RightPanel from "./components/common/RightPanel"


function App() {
  

  return (
    <div className="flex ">
      <Sidebar></Sidebar>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="/notifications" element={<NotificationPage></NotificationPage>}></Route>
      <Route path="/profile/:username" element={<ProfilePage></ProfilePage>}></Route>
      </Routes>
      <RightPanel></RightPanel>
    </div>
  )
}

export default App
