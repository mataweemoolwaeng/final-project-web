import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import NavbarTop from "../../../components/navbar/NavbarTop";
import TableListUsers from "../../../components/table/TableListUsers";
import ButtonAdd from "../../ItemPage/components/ButtonAdd";
import { useNavigate } from "react-router-dom";
import checkToken from "../../../config/checkToken";
import { GetKanitFont } from "../../../config/fonts";
import NavbarItem from "../../../components/navbar/NavbarItem";
import SearchUser from "./components/SearchUser";
// const UserContext = createContext<any>();
import LoaderTable from "../../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../../router/pathPage";
function Users() {
  const navigate = useNavigate();
  const [getUsers, setGetUsers] = useState<object>({});
  const [resetUsers, setResetUsers] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<any>(undefined);

  // setGetUsers
  useMemo(async () => {
    try {
      const resUsers = await axios(configAxios("get", API.getUsers));
      setGetUsers(resUsers.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [resetUsers]);

  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    if (userAdmin !== "true") {
      navigate(pathRoutesPage.Dashboard);
    }
  }, []);
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={"editUser"} />
      <NavbarItem clickPage={"editUser"} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>สำหรับผู้ดูแลระบบ</h3>
      </div>
      <ButtonAdd
        pageAdd={pathRoutesPage.NewUser}
        titleButton={"เพิ่มผู้ใช้งาน"}
      />

      {getUsers ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchUser
              getUsers={getUsers}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          <TableListUsers
            itemList={dataFilter ? dataFilter : getUsers}
            setResetUsers={setResetUsers}
            resetUsers={resetUsers}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default Users;
