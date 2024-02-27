import './App.css';
import ProtectedRoute from "./ProtectedRoute";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Search from "./Search";
import Login from "./Login";
import Nav from "./Nav";


function App() {
    return (
        <div>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/search" element={
                        <ProtectedRoute>
                            <Search/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App;
