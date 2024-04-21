import {sidebarLinks} from "../../../assets/static_data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import {useDispatch, useSelector} from "react-redux"
import Sidebarlinks from "./Sidebarlinks"
import Spinner from "../../common/Spinner"
import { useNavigate } from "react-router-dom"
 import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from "../../common/Confirmationmodal"
const Sidebar = () => {
    const {user} = useSelector((state)=>state.profile)
    
    const {loading:profileloading} = useSelector((state)=>state.profile);
    const {loading:authloading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal,setConfirmationModal] = useState(null);
    if(authloading || profileloading){
        return (
            <div className="mt-10">
            <Spinner/>
            </div>)
    }else{
            return ( 
            <div className="relative ">
                <div className="flex lg:min-w-[220px] flex-col border-r-[1px]-richblack-800 rounded-md
                     min-h-[calc(100vh-3.5rem)] h-full bg-richblack-800 py-10 sm:min-w-[110px]">
                    
                        <div className="flex flex-col gap-y-2">
                            {sidebarLinks.map((link)=>{
                                
                                
                                if(link.type && user?.accountType !== link.type) return null;
                                
                                    return(
                                        <Sidebarlinks link={link} iconName={link.icon} key={link.id}/>
                                        )
                                    
                            })}

                        </div>
                            <div className="mx-auto mt-6 mb-6 h-[1px] rounded-md w-10/12 bg-richblack-600"></div>
                            <div className="flex flex-col">
                                    <Sidebarlinks link={{name:"Settings",path:"/dashboard/settings"}} iconName="VscSettingsGear"/>
                                    <button 
                                        onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Are you sure?",
                                                    text2: "You will be logged out of your account.",
                                                    btn1Text: "Logout",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => dispatch(logout(navigate)),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                        }
                                        className="text-sm item font-medium text-richblack-100">
                                            <div className="flex -translate-x-10  my-4 justify-center items-center gap-x-2">
                                                <VscSignOut className="text-lg"/>
                                                <span>Logout</span>
                                            </div>
                                        </button>
                            
                            </div>
                </div>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
       </div> );

    }
}
 
export default Sidebar;