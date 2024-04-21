import ContactUsForm from "../../common/ContactUsForm";
const ContactFormSection = () => {
    return ( 
        <div className="mx-auto bg-richblack-600 rounded-xl py-6 flex flex-col gap-2 w-7/12 mt-20">
            <h1 className="text-center text-3xl font-inter">
                Get in Touch!!
            </h1>
            <p className="text-center text-md font-edu-sa font-thin opacity-95">
                We'd like to have your opinion. Please fill up the form.
            </p>
            <div className="my-4 ">
                <ContactUsForm/>
            </div>
            
        </div>
     );
}
 
export default ContactFormSection;