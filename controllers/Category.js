const Category = require("../models/Category");
//create Category handler function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.createCategory = async (req,res)=>{
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"ALL fields are not filled",
            })
        }
        //create entry in db
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);
        //return response
        return res.status(200).json(
            {
                success:true,
                message:"Category created",
            }
        )

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        })
    }
}
//getAllCategorys function
exports.getAllCategorys=async(req,res)=>{
    try{
        const allCategorys = await Category.find({},{name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"displayed all Categorys",
            data:allCategorys,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        });
    }
}
//getcategorydetails
exports.getcategorydetails = async(req,res)=>{
    try{
        //get catId
        const {catId}= req.body;
        //get all courses regarding that catId
        const selectcategory = await Category.findById(catId).populate("course").exec();
        //validation
        if(!selectcategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }
        //get courses other than that catId
        const diffcategory = await Category.find({
            _id: {$ne : catId},
        }).populate("course").exec();

        //get top selling courses
        return res.status(200).json({
            success:true,
            data:{
                selectcategory,
                diffcategory,
            }
        })
        
    }catch{
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        });

    }
}
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId} = req.body
      //console.log(req.body);
      //console.log("PRINTING CATEGORY ID: ", categoryId);
      if(!categoryId){
        return res.status(401).json({
            success:false,
            message:"ALL fields are not filled",
        })}
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        // return res.status(404).json({
        //   success: false,
        //   message: "No courses found for the selected category.",
        // })
        return res.status(200).json({
          success: true,
          message: "No courses found for the selected category.",
        })

      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      // const mostSellingCourses = allCourses
      //   .sort((a, b) => b.sold - a.sold)
      //   .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          //mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }