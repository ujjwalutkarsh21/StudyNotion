import { Link } from "react-router-dom";

const CTAButton = ({text,active,linkto}) => {
    return ( 
        <Link to={linkto}>
        <button className={`text-center px-4 py-3 text-{13px} rounded-md font-bold
        ${active? "bg-yellow-50 text-black":"bg-richblack-800"} 
        hover:scale-95 transition-all duration-200`}>{text}</button>
        </Link>
     );
}
 
export {CTAButton};