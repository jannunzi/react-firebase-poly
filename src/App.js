import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/auth-context";
import Signup from "./screens/signup";
import Login from "./screens/login";
import Profile from "./screens/profile";
import Home from "./screens/home";
import ProtectedRoute from "./routes/protected-route";
import Administrator from "./screens/admin";
import Media from "./screens/media";
import SuperChat from "./screens/super-chat";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/media" element={<Media/>}/>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>}/>
            <Route path="/admin" element={
              <ProtectedRoute>
                <Administrator/>
              </ProtectedRoute>}
            />
            <Route path="/super-chat" element={
              <ProtectedRoute>
                <SuperChat/>
              </ProtectedRoute>
            }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
