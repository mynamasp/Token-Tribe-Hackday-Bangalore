import "./App.css";
import OpeningPage from "./components/OpeningPage";
import Admin from "./components/Admin/admin";
import LeaderBoard from './components/LeaderBoard';
import Bounty from './components/Bounty';
import Leaderboard from "./components/LeaderBoard";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate
} from "react-router-dom";

import CommentPage from "./components/CommentPage";
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
      path: 'leaderboard' ,
      element: (<LeaderBoard/>)//Navbar needed
    },
    {
      path: 'bounty' ,
      element: (<Bounty/>)//Navbar needed
    },
    {
      path: 'bounty/comments' ,
      element: (<CommentPage/>)//Navbar needed
        
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
