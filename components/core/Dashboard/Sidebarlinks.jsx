import * as Icons from "react-icons/vsc"

import { NavLink, useLocation } from "react-router-dom";
const Sidebarlinks = ({link,iconName}) => {
   const Icon = Icons[iconName];
   const location = useLocation();
   
   
   const matchRoute = (route) => {
    return route === location.pathname;
}

    return ( 
    <NavLink to={link.path} onClick={".."}
    className={` relative px-8 py-2  transition-all ${matchRoute(link.path)? "bg-yellow-50 text-richblack-900 font-semibold":"bg-opacity-0  text-richblack-100"}`}>
        <span className={`absolute left-0 top-0  h-full ${matchRoute(link.path)? "bg-yellow-300":"bg-opacity-0"} w-[0.5rem] `}></span>
        <div className="flex items-center gap-x-2">
            <Icon className="text-lg"/>
            <span>{link.name}</span>

        </div>
    </NavLink> );
}
 
export default Sidebarlinks; 