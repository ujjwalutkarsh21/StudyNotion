import { HighlightText } from "./HighlightText";
import img1 from "../../../assets/imgvideo/Images/Know_your_progress.svg"
import img2 from "../../../assets/imgvideo/Images/Compare_with_others.svg"
import img3 from "../../../assets/imgvideo/Images/Plan_your_lessons.svg"
import { CTAButton } from "./CTAbutton";
const ImageComponent = () => {
    return ( 
    <div>

        <div className="flex w-11/12 flex-col gap-5 mb-10 mt-[6rem]  items-center">
            <div className="text-4xl text-center font-semibold">
                Your swiss knife for 
                <HighlightText text={"learning any language"}/>
            </div>
            <div className="text-richblack-600 w-7/12 ">
                <p className="text-center drop-shadow-md font-semibold text-[16px]">
                    Using spin making learning multiple language easy, with 20+ languages realistic voice-over, 
                    progress tracking, custom schedule and more

                </p>
            </div>
            <div className="lg:flex lg:flex-row sm:flex-col items-center justify-center mt-5">
                <img src={img1} alt="photos" loading="lazy" className=" lg:translate-x-[40%] object-contain scale-80  sm:scale-100"/>
                <img src={img2} alt="photos" loading="lazy" className="object-contain scale-80 sm:scale-100"/>
                <img src={img3} alt="photos" loading="lazy" className=" translate-x-[-40%] object-contain scale-80  sm:scale-100 "/>
            </div>
            <div>
                <CTAButton text={"Learn more"} active={true} linkto={"/login"}/>
            </div>
        </div>
    </div>
         );
}
 
export default ImageComponent;
