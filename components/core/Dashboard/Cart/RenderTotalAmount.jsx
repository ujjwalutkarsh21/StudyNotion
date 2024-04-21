import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/paymentapi";
const RenderTotalAmount = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {total,cart} = useSelector((state)=>state.cart);
    const handleBuyCourse = ()=>{
        const courses = cart.map((course)=>course._id);
        // console.log("buy course",course);
        buyCourse(token,courses,user,navigate,dispatch);
    }
    return ( 
      <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
        <button onClick={handleBuyCourse} className={`text-center px-4 py-3 text-{13px} rounded-md font-bold
         bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}>Buy Now</button>
        
    </div> );
}
 
export default RenderTotalAmount;