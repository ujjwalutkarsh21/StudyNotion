const Stats = () => {
    const Stats = [
        {count: "5K",label:"Active Students"},
         {count: "10+",label:"Mentors"},
          {count: "200+",label:"Courses"},
           {count: "50+",label:"Awards"},

    ]
    return ( 
        <div className="lg:flex lg:flex-row justify-evenly my-10  bg-richblack-500 text-lg text-puregreys-25 rounded-lg sm:flex sm:flex-col ">
            {
                Stats.map((element,index)=>{
                    return(
                        <div key={index} className="text-center " >
                            <h1>{element.count}</h1>
                            <h2>
                                {element.label}
                            </h2>
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default Stats;