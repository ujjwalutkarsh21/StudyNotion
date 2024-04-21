import { useSelector } from "react-redux";
import {Outlet} from "react-router-dom"
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
    const {loading:authloading} = useSelector((state)=>state.auth);
    const{loading:profileloading} = useSelector((state)=>state.profile)
    //need to make  sidebar height equal to rendered component height using this variable
    // let height;
    if(authloading || profileloading){
        return (
            <div className="mt-10">
            <Spinner/>
            </div>)
    }else{

        return ( 
            <div className="relative flex max-h-max min-h-[calc(100vh-3.5rem)] h-fit ">
                <Sidebar/>
                <div className="  w-10/12 min-h-[calc(100vh-3.5rem)] ">
                    <div className="mx-auto w-10/12 max-h-max bg-richblack-800  max-w-full rounded-md py-10">
                    <Outlet/>
                    </div>
                </div>
                   

            </div>
           
         );
    }
}
 
export default Dashboard;