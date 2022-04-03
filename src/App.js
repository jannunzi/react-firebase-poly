import Signup from "./screens/signup";
import {AuthProvider} from "./contexts/auth-context";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./screens/login";
import Profile from "./screens/profile";
import Home from "./screens/home";
import ProtectedRoute from "./routes/protected-route";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
