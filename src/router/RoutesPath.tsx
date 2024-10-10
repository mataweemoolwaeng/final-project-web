import { Routes, Route } from "react-router-dom";
// Link
// HOME
// import Home from "../pages/HomePage/Home";
import CategoryItem from "../pages/HomePage/CategoryItem";
import TypeItems from "../pages/HomePage/TypeItems";
import Items from "../pages/ItemPage/Items";
import HomeCate from "../pages/HomePage/HomeCate";
import HomeType from "../pages/HomePage/HomeType";
import Login from "../pages/LandingPages/Login/Login";

import Faculty from "../pages/LocationsPages/Faculty";
import Department from "../pages/LocationsPages/Department";
import Building from "../pages/LocationsPages/Building";
import Location from "../pages/LocationsPages/Location";
import TypeItemSetting from "../pages/ItemPage/TypeItem/TypeItemSetting";
import CategorySetting from "../pages/ItemPage/Category/CategorySetting";
// ADD
import NewItem from "../pages/ItemPage/NewItem";
import NewFaculty from "../pages/LocationsPages/components/addPage/NewFaculty";
import NewDepartment from "../pages/LocationsPages/components/addPage/NewDepartment";
import NewBuilding from "../pages/LocationsPages/components/addPage/NewBuilding";
import NewLocation from "../pages/LocationsPages/components/addPage/NewLocation";
import NewUser from "../pages/LandingPages/User/NewUser";
import NewTypeItem from "../pages/ItemPage/TypeItem/NewTypeItem";
import NewCateItem from "../pages/ItemPage/Category/NewCategory";
// Edit
import EditItem from "../pages/ItemPage/EditItem";
import EditFaculty from "../pages/LocationsPages/components/editPage/EditFaculty";
import EditDepartment from "../pages/LocationsPages/components/editPage/EditDepartment";
import EditBuilding from "../pages/LocationsPages/components/editPage/EditBuilding";
import EditLocation from "../pages/LocationsPages/components/editPage/EditLocation";
import EditCategory from "../pages/ItemPage/Category/EditCategory";
import EditTypeItem from "../pages/ItemPage/TypeItem/EditTypeItem";
import EditUser from "../pages/LandingPages/User/EditUser";
//
import Profile from "../pages/LandingPages/User/Profile";
import Users from "../pages/LandingPages/User/Users";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";
// ApplicationDownload
import ApplicationDownload from "../pages/ApplicationDownload/ApplicationDownload";

//test
// import UpTestt from "../pages/upTest/UpTestt";

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/test_Up" element={<UpTestt />} /> */}
        <Route path="/application_download" element={<ApplicationDownload />} />

        {/* Home */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/homeCate" element={<HomeCate />} />
        <Route path="/homeType" element={<HomeType />} />

        <Route path="/items" element={<Items />} />
        <Route path="/category_item" element={<CategoryItem />} />
        <Route path="/typeItem_item" element={<TypeItems />} />

        {/* Setting */}
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/department" element={<Department />} />
        <Route path="/building" element={<Building />} />
        <Route path="/location" element={<Location />} />
        <Route path="/type_item" element={<TypeItemSetting />} />
        <Route path="/category" element={<CategorySetting />} />

        {/* Add */}
        <Route path="/newitem" element={<NewItem />} />
        <Route path="/newfaculty" element={<NewFaculty />} />
        <Route path="/newdepartment" element={<NewDepartment />} />
        <Route path="/newbuilding" element={<NewBuilding />} />
        <Route path="/newlocation" element={<NewLocation />} />
        <Route path="/newTypeItem" element={<NewTypeItem />} />
        <Route path="/newCategory" element={<NewCateItem />} />

        {/* Edit */}
        <Route path="/editItem" element={<EditItem />} />
        <Route path="/editfaculty" element={<EditFaculty />} />
        <Route path="/editdepartmen" element={<EditDepartment />} />
        <Route path="/editbuilding" element={<EditBuilding />} />
        <Route path="/editlocation" element={<EditLocation />} />
        <Route path="/editCategory" element={<EditCategory />} />
        <Route path="/editTypeItem" element={<EditTypeItem />} />
        <Route path="/editUser" element={<EditUser />} />

        {/* User */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Users />} />
        <Route path="/new_user" element={<NewUser />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
