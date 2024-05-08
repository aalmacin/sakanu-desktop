import './App.css';
import ProtectedRoute from "./ProtectedRoute";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Search from "./Search";
import Login from "./Login";
import Nav from "./Nav";
import Terms from "./Terms";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0d47a1', // A darker shade of blue
        },
        secondary: {
            main: '#ff9800', // A shade of orange
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Router>
                    <Nav/>
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
                        <Route path="/terms" element={
                            <ProtectedRoute>
                                <Terms/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}


export default App;
