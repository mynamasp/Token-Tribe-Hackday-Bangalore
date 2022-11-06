import "./App.css";
import OpeningPage from "./components/OpeningPage";
import Admin from "./components/Admin/admin";
import Leaderboard from "./components/LeaderBoard";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

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

])

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}
export default App;
