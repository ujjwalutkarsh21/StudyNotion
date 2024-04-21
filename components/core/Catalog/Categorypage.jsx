import Footer from "../../common/Footer";
import CourseSlider from "../../common/CourseSlider";
import {useParams }from "react-router-dom";
// import { apiConnector } from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import Error from "../../../pages/Error";
// import CourseCard from "./CourseCard"
// import {courseEndpoints ,categories} from "../../../services/apis";
import { getCategoryPageData } from "../../../services/operations/PageAndComponentData";
import { useEffect, useState } from "react";
const Categorypage = () => {
    const {catalogName }= useParams();
    console.log("Printing catalog name:",catalogName);
    const [active, setActive] = useState(1);
    const {loading} = useSelector((state) => state.profile);
    const [catalogPageData,setCatelogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    // //fetch all categories
    useEffect(() =>{
         const getCategoryDetails = async() => {
    //         try{
    //             // const result = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
    //             // const result = await apiConnector("GET", categories.CATEGORIES_API);
    //             // console.log("Printing category result:",result);
    //             // const category_id = result.data.data.filter((category) => category.name === catalogName)[0]._id;
    //             // console.log("Printing category id:",category_id);
    //             // setCategoryId(category_id);
    //             //get data from localstorage
                const sublinks = JSON.parse(localStorage.getItem("sublinks"));
               console.log("Printing sublinks:hereee",sublinks);
               const category_id = sublinks.filter((category) => category.name === catalogName)[0]._id;
                console.log("Printing category id:",category_id);
               setCategoryId(category_id);
                
    //         }catch(error){
    //             console.log("Could not fetch the category list");
    //             console.log(error);
           
      };
        getCategoryDetails();
          },[catalogName]);
    useEffect(() =>{ 
        const getCategoryPagedata = async() => {
        try{
            const result = await getCategoryPageData(categoryId);
            console.log("Printing category page result:",result);
            console.log("Printing category page result:",result.data)
            setCatelogPageData(result);
        }catch(error){
            console.log("Could not fetch the category page data");
            console.log(error);
        }
        }
    getCategoryPagedata();

    },[categoryId]);
   
    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
            {/* <div>hello</div> */}
          {/* Hero Section */}
           <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {/* {catalogPageData?.data?.selectedCategory?.name} */}
                  {catalogName }
                </span>
              </p>
              <p className="text-white mb-4 font-medium leading-6 tracking-tighter text-4xl">
                {/* {catalogPageData?.data?.selectedCategory?.name} */}
                {catalogName}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div> 
     
          {/* Section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.course}
              />
            </div>
          </div> 
          {/* Section 2 */}
           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.course}
              />
            </div>
          </div> 
    
          {/* Section 3 */}
          {/* <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading ">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourse?.length===0?
                (<p className="text-xl text-richblack-5">No Course Found</p>):
                catalogPageData?.data?.mostSellingCourse
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>  */}
     
          <Footer />
        </>
      );
}
 
export default Categorypage;