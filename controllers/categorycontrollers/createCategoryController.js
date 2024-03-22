const Category = require ("../../model/categoryModel.js");
const { findOneAndUpdate } = require("../../model/usermodel.js");

async function createCategoryController(req, res) {
  const { name, description } = req.body;
  console.log(name, description);

  let ExistingCategoruy = await Category.find({ name});
  if (ExistingCategoruy.length > 0) {
    return res.send({ error: "Category Alrady exist. Try another" });
  }

  let category = new Category({
    name,
    description,
  });
  category.save();
  res.send({ succses: "Category create SucsseFully" });
}
async function categoryStatusController(req, res) {
  const { name, status } = req.body;
  console.log(name, status);

 if(status == "rejected" || status == "witing"){
    let statusUpdate = await Category.findOneAndUpdate({name},{$set:{isActive:false,status:status}},{new:true})
    return res.send({succses:"Status Updated"})
 }else if(status == "approved"){
    let statusUpdate = await Category.findOneAndUpdate({name},{$set:{isActive:true,status:status}},{new:true})
    return res.send({succses:"Status Updated"})
 }

}

module.exports = {createCategoryController,categoryStatusController};
