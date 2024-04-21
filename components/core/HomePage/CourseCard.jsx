import{PiStudentFill} from "react-icons/pi"
import {MdFormatListNumbered} from "react-icons/md"
const CourseCard = ({ 
                    cardData,
                    currentCard,
                    setCurrentCard,
                    
                      }) => {
    const setMyCard = (cardData)=>{
        console.log(cardData.heading);
        console.log(currentCard);
        setCurrentCard(cardData.heading);
    }
    
    return ( 
    <div className={` lg:w-[540px] sm:min-w-[60px] flex flex-col gap-4 rounded-[10px]  relative  mt-12 
    ${currentCard===cardData.heading?"bg-yellow-5 text-richblack-900 shadow-lg shadow-yellow-200" : "bg-richblack-700 text-puregreys-300 shadow-lg shadow-richblack-800 "}`
    }onClick={() => setMyCard(cardData)}>
        <div className="text-center font-semibold text-2xl ">{cardData.heading}</div>
        <div className="text-center text-[16px]">{cardData.description}</div>
        <div className="text-center">..............</div>
        <div className="flex flex-row items-center gap-8 justify-evenly">
            <div className="flex flex-row gap-2 items-center">
                <div>
                    <PiStudentFill color="blue"/>
                </div>
                <div>
                    {cardData.level}
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <div >
                    <MdFormatListNumbered color="blue"/>
                </div>
                <div>
                    {cardData.lessionNumber}
                </div>
            </div>

        </div>

    </div>
     );
}
 
export default CourseCard;