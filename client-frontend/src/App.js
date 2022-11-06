import "./App.css";
import OpeningPage from "./components/OpeningPage";
import Admin from "./components/Admin/admin";
import Leaderboard from "./components/LeaderBoard";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import TokenExchange from "./components/TokenExchange";
import ChoosePage from "./components/ChoosePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: (<OpeningPage />)
    },
    {
        path: 'admin',
        element: (<Admin />)
    },
    {
        path: 'leaderboard',
        element: (<Leaderboard />)
    },
    {
        path: 'buytoken',
        element: (<TokenExchange />)
    },
    {
        path: 'register',
        element: (<ChoosePage />)
    }

])

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}
export default App;
