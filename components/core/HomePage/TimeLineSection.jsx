import Logo1 from "../../../assets/imgvideo/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/imgvideo/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/imgvideo/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/imgvideo/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/imgvideo/Images/TimelineImage.png"
const TimeLineSection = () => {
    const timeLine = [
        {
            Logo:Logo1,
            heading: "Leadership",
            Description:"Making Future Leaders by sharpening skills"

        },{
        
            Logo:Logo2,
            heading: "Leadership",
            Description:"Making Future Leaders by sharpening skills"

        },
        {
            Logo:Logo3,
            heading: "Leadership",
            Description:"Making Future Leaders by sharpening skills"

        },
        {
            Logo:Logo4,
            heading: "Leadership",
            Description:"Making Future Leaders by sharpening skills"

        },
    ]
    return (
        <div>
            <div className="lg:flex lg:flex-row lg:gap-10 items-center sm:flex sm:flex-col sm:w-full sm:place-items-center mt-8">
                <div className="w-[45%] flex flex-col gap-5">
                    {timeLine.map((element,index)=>{
                            return (
                                <div className="flex flex-row gap-6 " key={index}>
                                    <div className="w-[50px] h-[50px] bg-white flex items-center"  >
                                        <img src={element.Logo} alt="photos" loading="lazy"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-[16px]">{element.heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                        <div className={`${index<3?"visible":"hidden"}  items-center w-1/12 h-1/12  text-puregreys-500  flex flex-col`}>
                                            <pre>.</pre>
                                            <pre>.</pre>
                                            <pre>.</pre>
                                            
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
                </div>
                <div className="relative sm:mt-16">
                        <img src={TimelineImage} loading="lazy" alt="photos" className="rounded-full  shadow-lg shadow-richblue-200 drop-shadow-2xl object-cover h-fit"></img>
                </div>

            </div>
        </div>
      );
}
 
export default TimeLineSection;