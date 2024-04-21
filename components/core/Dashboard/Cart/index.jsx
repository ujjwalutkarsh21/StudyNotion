import { useSelector } from "react-redux";
import RenderCartItems from "./RenderCartItems";
import RenderTotalAmount from "./RenderTotalAmount";
const Cart = () => {
     const {totalItems} = useSelector((state)=>state.cart);
     const {total} = useSelector((state)=>state.cart);
    // console.log(totalItems);
    // console.log(total);
    return ( 
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400"> {totalItems} Courses in cart</p>
            {total>0?
            (<div  className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                <RenderCartItems/>
                <RenderTotalAmount/>

            </div>):
            (<div className="mt-14 text-center text-3xl text-richblack-100">Cart is empty</div>)}
        </div>
     );
}
 
export default Cart;
