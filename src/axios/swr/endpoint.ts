import { baseURL } from "../config";
export const API = {
  login: baseURL + `/loginUser`,
  // GET
  getUsers: baseURL + `/getUsers`,
  getProfile: baseURL + `/getProfile`,
  getItem: baseURL + `/getItem`,
  getCategory: baseURL + `/getCategory`,
  getFaculty: baseURL + `/getFaculty`,
  getDepartment: baseURL + `/getDepartment`,
  getBuilding: baseURL + `/getBuilding`,
  getLocation: baseURL + `/getLocation`,
  getTypeItem: baseURL + `/getTypeItem`,
  checkToken: baseURL + `/checkToken`,

  // GETById
  getItemById: baseURL + `/getItem/`,
  getItemCategory: baseURL + `/getItemCategory/`,
  getCategoryByDpm_Id: baseURL + `/getCategoryByDpm_Id/`,
  getItemByTypeID: baseURL + `/getItemByTypeID/`,
  getDepartmentByFtyId: baseURL + `/getDepartmentByFtyId/`,
  getDepartmentById: baseURL + `/getDepartmentById/`,
  getBuildingByDpmId: baseURL + `/getBuildingByDpmId/`,
  getLocationByBud_Id: baseURL + `/getLocationByBud_Id/`,
  getHistoryStatusItem: baseURL + `/getHistoryStatusItem/`,
  getTypeItemByDpmId: baseURL + `/getTypeItemByDpmId/`,
  getItemsByIds: baseURL + `/getItemsByIds`,

  //POST
  createUser: baseURL + `/createUser`,
  createUserPhoto: baseURL + `/createUserPhoto`,
  updateUserProfile: baseURL + `/updateUserProfile`,
  createItem: baseURL + `/createItem`,
  createItemPhoto: baseURL + `/createItemPhoto`,
  createCategory: baseURL + `/createCategory`,
  createTypeItem: baseURL + `/createTypeItem`,
  createFaculty: baseURL + `/createFaculty`,
  createDepartment: baseURL + `/createDepartment`,
  createBuilding: baseURL + `/createBuilding`,
  createLocation: baseURL + `/createLocation`,
  updateStetus: baseURL + `/updateStetus`,
  updateStetusPhoto: baseURL + `/updateStetusPhoto`,
  createImgItems: baseURL + `/createImgItems`,

  //Delete
  deleteItem: baseURL + `/deleteItem`,
  deleteImgItems: baseURL + `/deleteImgItems`,
  deleteTypeItem: baseURL + `/deleteTypeItem`,
  deleteImgItemsDamaged: baseURL + `/deleteImgItemsDamaged`,

  //PUT
  updateUser: baseURL + `/updateUser/`,
  updateUserPhoto: baseURL + `/updateUserPhoto/`,
  updateItem: baseURL + `/updateItem/`,
  updateItemPhoto: baseURL + `/updateItemPhoto/`,
  updateFaculty: baseURL + `/updateFaculty/`,
  updateDepartment: baseURL + `/updateDepartment/`,
  updateBuilding: baseURL + `/updateBuilding/`,
  updateLocation: baseURL + `/updateLocation/`,
  updateCategory: baseURL + `/updateCategory/`,
  updateTypeItem: baseURL + `/updateTypeItem/`,
  updateTypeItemByOne: baseURL + `/updateTypeItemByOne/`,

  // Block
  updateUserBlock: baseURL + `/updateUserBlock`,


  // Auto Recommend Code
  autoRecommendCode: baseURL + `/autoRecommendCode`,
};

/*
// Category
router.post("/createCategory", 
router.get("/getCategory", 
router.put("/updateCategory/:id",
router.post("/deleteCategory", 
*/
