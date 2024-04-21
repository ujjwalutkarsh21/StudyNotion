import { CTAButton } from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from "react-type-animation"
const CodeBlocks = (
    {
    ctabtn1,
    ctabtn2,
    position,
    heading,
    subheading,
    codeblock,
    codeColor}) => {
    return ( 
        <div className={`lg:flex sm:flex ${position}  w-100% sm:gap-10 justify-between lg:gap-10 mb-12 `}>
            {/*Section 1 */}
            <div className="max-w-50% flex gap-8 flex-col">
                <div className="text-4xl text-center ">
                {heading }
                </div>
                <div className={`text-richblack-300 font-bold`}>
                    {subheading}
                </div>
            <div className="flex gap-3 mt-7">
                <CTAButton
                    text={
                        <div className="flex gap-2 items-center">
                            
                            {ctabtn1[0]}
                            <FaArrowRight />
                        </div>
                    }
                    active={ ctabtn1[2]} 
                    linkto={ ctabtn1[1]}
                >
                </CTAButton>
               
                <CTAButton text={ctabtn2[0]} active ={ctabtn2[2]} linkto={ctabtn2[1]}>
                  
                </CTAButton>
            </div>
            </div>
            {/*Section 2*/}
            {/* <div className={`w-50% ${bgGradient} ${codeColor}`}>
                <pre className="relative right-16 ">
                 {codeblock}
                </pre>
                
            </div> */}
             <div className=' h-fit  relative lg:bottom-8 sm:bottom-2 flex flex-row text-[14px] w-[100%] py-3 lg:w-[500px] '> 
        {/*HW -> BG gradient*/}

        <div className='text-center flex flex-col w-[10%] text-richblack-400 mt-6 font-inter  font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>

        <div className={`w-[90%] flex  flex-col gap-2 font-bold  font-mono ${codeColor}  pr-2`}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

     </div>



        </div>
       
     );
}
 
export {CodeBlocks};