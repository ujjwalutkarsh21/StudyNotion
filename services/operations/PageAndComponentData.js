
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {courseEndpoints} from "../apis"
const {GET_CATEGORY_PAGE_DETAILS_API} = courseEndpoints;
export const  getCategoryPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    console.log("categoryId--->",categoryId);
    let result = [];
    try {
        if(!categoryId){
            throw new Error("All fields are not filled");
        }else{

            const response = await apiConnector("POST", GET_CATEGORY_PAGE_DETAILS_API, {
            categoryId:categoryId,
          });
        
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
            
        }
         result = response?.data;
    }

    } catch (error) {
        // toast.error("Something went wrong");
        // console.log("Catalog page error...",error);
        // result = error?.response?.data;
    }
    toast.dismiss(toastId);
    return result;

};
