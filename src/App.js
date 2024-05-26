import ProtectedRoute from "./ProtectedRoute";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Search from "./Search";
import About from "./About";
import Nav from "./Nav";
import Terms from "./Terms";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Container, Box } from '@mui/material';
import NotFound from "./NotFound";
import GlobalSearch from "./GlobalSearch";

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#4682B4',
        },
        secondary: {
            main: '#ADD8E6',
        },
        accent: {
            main: '#FFFFFF',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" mb={3}>
                <Router>
                    <Nav/>
                    <Box sx={{ pt: 4 }}>
                        <Routes>
                            <Route path="/" element={
                                <GlobalSearch />
                            }/>
                            <Route path="/welcome" element={
                                <ProtectedRoute>
                                    <Home/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/terms" element={
                                <ProtectedRoute>
                                    <Terms/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/search" element={
                                <ProtectedRoute>
                                    <Search/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Box>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;