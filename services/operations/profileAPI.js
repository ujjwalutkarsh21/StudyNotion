import { apiConnector } from "../apiconnector";
import {profileEndpoints} from "../apis";
import { toast } from "react-hot-toast";
//import {setLoading } from "../../slices/profileSlice";

const {GET_USER_ENROLLED_COURSES_API,GET_USER_DETAILS_API} = profileEndpoints;
export async function getenrolledcourses(token){
    
       
        //console.log("hello");
        const toastId = toast.loading("Loading...");
        //dispatch(setLoading(true));
        let result = [];
        try{
           // console.log("testing");
            const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,null,
            {Authorization: `Bearer ${token}`})
            //console.log("testing2");
            console.log("GET Enrolled courses API RESPONSE............", response.data);
            //console.log(response.data.success);
           //dispatch(setLoading(false));
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data;
              
        }catch(err){
            //dispatch(setLoading(false));
            toast.error("unavailable to fetch enrolled courses");
           console.log("internal server error ");
            console.log(err);
        }
        
        toast.dismiss(toastId);
        return result;
    }
