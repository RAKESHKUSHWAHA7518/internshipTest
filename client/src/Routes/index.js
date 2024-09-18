import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homes from "../pages/Homes";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import Employee from "../pages/Employee";
 
const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element: <Homes/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'sign-Up',
                element:<SignUp/>
            },
            {
                path:'Admin-dashboard',
                element:<AdminPanel/>,
                
                    
                
            },
            {
                path:'Employee-List',
                element:<Employee/>

            },

        ]

    }
])

export default router