import "./App.css";
import OpeningPage from "./components/OpeningPage";
import Admin from "./components/Admin/admin";
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
