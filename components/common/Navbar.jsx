import { Link,matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/imgvideo/Logo/Logo-Full-Light.png"
import {MdOutlineArrowDropDown} from "react-icons/md"
import {NavbarLinks} from "../../assets/static_data/navbar-links"
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
const Navbar = () => {
    const [ssubLinks, setssubLinks]  = useState([]);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const location = useLocation();


    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            //add result.data.data to localstorage it is array of objects
            //add result.data.data into session storage
            if(localStorage.getItem("sublinks")){
                localStorage.removeItem("sublinks");
            }
            localStorage.setItem("sublinks",JSON.stringify(result.data.data));
            setssubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        fetchSublinks();
    },[] )

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
    
    return ( 
        
        <div className=" lg:flex h-fit  lg:my-3 lg:flex-row lg:justify-evenly lg:items-center 
        lg:w-11/12 lg:mx-auto text-richblack-25 sm:flex sm:flex-col sm:mt-10
        sm:items-center sm:w-11/12 sm:justify-center ">
            <div>
                <Link to={"/"}>
                <img src={logo} width={160} height={42}  loading="lazy" alt="logo"/>
                </Link>
            </div>
            
               <nav >
                <ul className="lg:flex lg:flex-row lg:gap-4 sm:text-center sm:w-full sm:flex  sm:flex-col sm:items-center sm:p-2 sm:justify-center">
                    {
                        NavbarLinks.map((link,index)=>{
                           return(
                            <li key={index}>
                                {
                                    link.title==="Catalog"?
                                    (<div className="flex flex-row sm:p-1 items-center relative  group">
                                        <p>{link?.title}</p>
                                        <MdOutlineArrowDropDown/>
                                        {/* <div className=" text-center invisible group-hover:visible absolute left-[50%] top-[2rem]
                                        flex flex-col rounded-md bg-richblack-5  text-richblack-900 font-semibold 
                                        opacity-0 z-20 transition-all duration-200 group-hover:opacity-100  translate-x-[-50%]  lg:w-[10rem] sm:w-[5rem]">
                                           
                                            <div className="z-10  bottom-[20%] w-4 h-4  rotate-45 flex justify-center items-center   bg-richblack-5 
                                            sm:right-[2rem] sm:translate-y-[-10%] lg:w-[1rem] sm:w-[2rem]">
                                            </div> */}
                                        {/* <div className='invisible absolute left-[50%]
                                            translate-x-[-50%] translate-y-[80%]
                                        top-[50%]
                                        flex flex-col rounded-md z-10 bg-richblack-5 p-4 text-richblack-900
                                        opacity-0 transition-all duration-200 group-hover:visible
                                        group-hover:opacity-100 lg:w-[300px] sm:w-[150px]'>

                                            <div className='absolute left-[50%] top-0 
                                            translate-x-[80%] 
                                            translate-y-[-45%] h-4 w-4 rotate-45 rounded bg-richblack-5 sm:p-1'>
                                            </div> */}
                                        <div className='invisible absolute left-1/2 -translate-x-1/2 translate-y-[-2%] top-full flex flex-col rounded-md z-20 bg-richblack-5 p-1 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px] sm:w-[150px]'>

                                                <div className='absolute left-[60%] top-0 -translate-x-1/2 translate-y-[-2%] h-4 w-4 rotate-45 rounded-sm bg-richblack-5 sm:p-1'></div>

                                            {
                                                 (ssubLinks.length)?
                                                   (ssubLinks.map((element, index) => (
                                                        <Link to={`/catalog/${element.name}`} key={index} className="z-20 text-sm   rounded-md hover:bg-richblack-50 w-full p-1">
                                                            <p className="font-inter">{element.name}</p>
                                                        </Link>
                                                    ))):(<></>)
                                                 
                                            }
                                         
                                        </div>
                                        
                                     </div>):

                                    (<Link to={link?.path}><p className={`${matchRoute(link?.path)? "text-yellow-25":"text-richblack-25"}`}>{link.title}</p></Link>)
                                }
                            </li>
                           
                            ) 
                        })  
                    }
                </ul>
               </nav>
            
            <div className=" lg:flex lg:flex-row gap-4 lg:items-center sm:mt-3 sm:flex sm:items-center sm:flex-col">
                {
                    user && user?.accountType !== "Instructor" && 
                    ( <Link to="/dashboard/cart" className="relative flex place-items-center gap-2">
                        <AiOutlineShoppingCart/>
                        {
                            totalItems>0 && (
                                <span>{totalItems}</span>
                            )
                        }
                    </Link>)
                }
                {
                    token ===null && (
                        <Link to={"/login"}>
                        <button className="bg-richblack-700 text-white rounded-md px-3 py-1 font-semibold hover:bg-richblack-800">Login</button>
                        </Link>
                    )
                }
                {
                    token ===null && (
                        <Link to={"/signup"}>
                        <button className="bg-richblack-700 text-white rounded-md px-3 py-1 font-semibold hover:bg-richblack-800">Signup</button>
                        </Link>
                    )
                }
                {
                    token!==null && (
                        <ProfileDropdown/>
                    )
                }
             
            </div>
           
        
        </div>
        
        
        
       
     );
}
 
export {Navbar};
