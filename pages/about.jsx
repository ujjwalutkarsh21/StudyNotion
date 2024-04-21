import {HighlightText} from "../components/core/HomePage/HighlightText"
import Bannerimage1 from "../assets/imgvideo/Images/aboutus1.webp"
import Bannerimage2 from "../assets/imgvideo/Images/aboutus2.webp"
import Bannerimage3 from "../assets/imgvideo/Images/aboutus3.webp"
import foundingstory from "../assets/imgvideo/Images/FoundingStory.png"
import Quote from "../components/core/About/Quote"
import Stats from "../components/core/About/Stats"
import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/About/ContactFormSection"
const About = () => {
    return ( 
        <div className="text-richblack-5 w-11/12 mx-auto my-20 ">
            <section>
                <div>
                    <header className="flex flex-col gap-6 text-center place-items-center">
                        <p className="text-3xl text-center lg:w-5/12 sm:w-10/12">Driving Inovation in Online Education for a
                        <HighlightText text = {"Brighter Future"}/></p>
                        <p className="text-puregreys-100">StudyNotion is at the forefront of driving innovation in online education.
                            We're passionate about creating a brighter future by offering cutting-edge courses,
                            leveraging emerging technologies, and nuturing a vibrant learning community
                        </p>
                    </header>
                    <div className="lg:flex lg:flex-row lg:gap-x-3 lg:mt-20 lg:justify-center sm:flex sm:flex-col sm:mt-6 sm:justify-center sm:items-center">
                        <img src={Bannerimage1} alt="photos" className="lg:rounded-sm sm:w-7/12 sm:mt-5"/>
                        <img src={Bannerimage2} alt="photos" className="lg:rounded-sm sm:w-7/12 sm:mt-5"/>
                        <img src={Bannerimage3} alt="photos" className="lg:rounded-sm sm:w-7/12 sm:mt-5"/>
                    </div>
                </div>
            </section>
            <section>
                <div className="my-20 text-3xl text-center ">
                    <Quote/>
                </div>
            </section>
            <section>
                <div className="lg:flex lg:flex-col ">
                    < div className="lg:flex lg:flex-row lg:my-16 lg:justify-evenly sm:flex sm:flex-col sm:gap-6 sm:justify-center sm:items-center">
                        
                            <p className="lg:w-6/12 sm:10/12 text-center text-puregreys-25 ">
                            <h1 className="text-center text-4xl my-6 text-richblack-5">Our Founding Journey </h1>
                                Our e-learning platform was born out of a shared vision and passion for 
                                transforming education. It all began with a group of educators, technologies,
                                and lifelong learners wjho regonizedd the need for accessible , flexible and high-quality 
                                learning opportunities in a rapidly evolving digital world
                                <br/>
                                <br/>
                            As experiencered educators ourselves , we witnessed firsthand the
                            limitation  and challenges of the traditional education system. We believed that education 
                            should not be confined to the walls of the classes or restricted by graphical boundaries.
                            We envisioned a platform that could bring these gaps and empower individuals form
                            all walls of life to unlock their true potential. 
                        
                                 
                            </p>
                            <img src={foundingstory} className="lg:w-4/12 lg:rounded-sm sm:w-7/12 sm:rounded-sm " alt="photos"/>
                        
                    </div>
                    <div className="lg:flex lg:flex-row  my-20  lg:justify-evenly sm:flex sm:flex-col sm:justify-center sm:items-center ">
                       <div className="lg:flex flex-col lg:w-5/12  sm:w-10/12 lg:gap-3 sm:items-center sm:flex sm:justify-center ">
                        <h2 className="text-yellow-5 text-4xl text-center my-5">Our Vision</h2>
                        <p className="text-puregreys-25 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sed modi alias nemo perspiciatis provident magnam quaerat corporis maiores, maxime asperiores possimus illum voluptatibus incidunt iste 
                            excepturi! Quae eligendi optio excepturi nobis
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam atque tempore quaerat fugiat sed necessitatibus provident est labore quam sit rerum temporibus, dolores dolorem ullam reprehenderit?
                            Ad maxime unde reiciendis cumque laborum.
                            .</p>

                       </div>
                       <div className="lg:flex flex-col  lg:w-5/12 sm:w-10/12 lg:gap-3 sm:flex sm:items-center sm:justify-center">
                        <h2 className="text-blue-100 text-4xl text-center my-5">Our Mission</h2>
                        <p className="text-puregreys-25 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sed modi alias nemo perspiciatis provident magnam quaerat corporis maiores, maxime asperiores possimus illum voluptatibus incidunt iste 
                            excepturi! Quae eligendi optio excepturi nobis
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam atque tempore quaerat fugiat sed necessitatibus provident est labore quam sit rerum temporibus, dolores dolorem ullam reprehenderit?
                            Ad maxime unde reiciendis cumque laborum.</p>

                       </div>
                        

                    </div>
                </div>
            </section>
            <section>
                <Stats/>
            </section>
            <section className="mx-auto flex flex-col items-center justify-between gap-5 mb-[140px] ">
            <ContactFormSection/>
            </section>
            <div className="text-4xl text-center my-12">
                Reviews from Learners
            </div>
            <Footer/>
        </div>
     );
}
 
export default About;