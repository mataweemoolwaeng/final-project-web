import { CSVLink, CSVDownload } from "react-csv";
import { useState, useMemo, useEffect, useReducer } from "react";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import { useNavigate } from "react-router-dom";
import { chackStatusItem } from "../../config/chackStatusItem";
import moment from "moment";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import {
  Table,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  Card,
  Overlay,
  Popover,
} from "react-bootstrap";
// interface LineProps {
//   options: ChartOptions<"line">;
//   data: ChartData<"line">;
// }
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import Checkbox from "../../components/Checkbox";
function UpTestt() {
  const navigate = useNavigate();

  // const [checkeds, setShecked] = useState<any>();
  // const [reset, setReset] = useState<any>();
  // //
  // const getCheack = localStorage.getItem("arrClicked");
  // console.log(reset);
  // useEffect(() => {
  //   console.log("getCheack = ", getCheack);
  //   setReset(getCheack);
  // }, [getCheack]);

  // useMemo(() => {
  //   let arrClicked = [];
  //   for (let i = 0; i < items.length; i++) {
  //     arrClicked.push(false);
  //   }
  //   // console.log(arrClicked);
  //   setShecked(arrClicked);
  // }, []);
  const [getItems, setGetItems] = useState<{}>();
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getItem));
      setGetItems(res.data);

      let arrCl: any = [];
      {
        _.map(res.data, (item: any, idx) => {
          arrCl.push({ id: item.item_id, click: false });
        });
      }
      // console.log(arrCl);
      setCheckeds(arrCl);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  const initialState = {
    click: false,
    Change: false,
  };
  //

  //
  const reducer = (state: any, action: any) => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, initialState);
  const clearFilter = () => setState(initialState);

  const [checkeds, setCheckeds] = useState<any>();

  const [test, settest] = useState<boolean>(true);
  // console.log("test", test);
  // useEffect(() => {
  //   if (!getItems) {
  //     let arrCl: any = [];
  //     {
  //       _.map(getItems, (item: any, idx) => {
  //         arrCl.push({ id: item.item_id, click: false });
  //       });
  //     }
  //     console.log(arrCl);
  //     setCheckeds(arrCl);
  //   }
  // }, [getItems]);
  // console.log(checkeds);
  // console.log(state);
  return (
    <>
      <input
        type="checkbox"
        name="check"
        id="check"
        value="check"
        onChange={(event: any) => {
          console.log(event.target.checked);

          let arrCl: any = [];
          if (event.target.checked) {
            {
              _.map(getItems, (item: any, idx) => {
                arrCl.push({ id: item.item_id, click: true });
              });
            }
          } else {
            {
              _.map(getItems, (item: any, idx) => {
                arrCl.push({ id: item.item_id, click: false });
              });
            }
          }
          setCheckeds(arrCl);
        }}
        // checkeds={checkeds["check"]}
      />
      {/* <button onClick={() => clearFilter()}>Limpiar</button> */}
      <br />
      <Checkbox
        title="Click"
        fnClick={(v: any) => setState({ click: v })}
        checked={state.click}
      />
      <br />
      <Checkbox
        title="Change"
        fnChange={(v: any) => setState({ change: v })}
        checked={state.change}
      />
      <br />
      click: {state.click ? "true" : "false"}
      <br />
      change: {state.change ? "true" : "false"}
      <div>...........</div>
      {getItems && (
        <>
          {_.map(getItems, (item: any, idx: any) => {
            return (
              <>
                <div className="d-flex justify-content-center">
                  <Checkbox
                    // title="Change"
                    fnChange={(v: any) => {
                      // setState({ change: v })
                      settest(!test);
                      let arrClicked = checkeds;
                      arrClicked[idx] = { id: arrClicked[idx].id, click: v };
                      console.log(arrClicked);

                      setCheckeds(arrClicked);
                    }}
                    checked={checkeds[idx].click}
                  />
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
}

export default UpTestt;
/*

      .....
      <div>
        <input
          type="checkbox"
          name="check"
          id="check"
          value="check"
          onChange={(event: any) => {
            let arrClicked = [];
            if (event.target.checked) {
              for (let i = 0; i < items.length; i++) {
                arrClicked.push(true);
              }
            } else {
              for (let i = 0; i < items.length; i++) {
                arrClicked.push(false);
              }
            }
            let arrString = arrClicked.toString();
            localStorage.setItem("arrClicked", arrString);
            setShecked(arrClicked);
          }}
          // checkeds={checkeds["check"]}
        />
        <label>check</label>
      </div>

      {checkeds && (
        <>
          {_.map(checkeds, (item: any, idx: any) => {
            return (
              <>
                <div key={idx}>
                  <Button
                    style={{ width: 50, height: 50 }}
                    value={idx}
                    onClick={() => {
                      // console.log("testClick");
                      let arrClicked = checkeds;
                      arrClicked[idx] = !arrClicked[idx];
                      let arrString = arrClicked.toString();
                      console.log("arrClicked " + arrString);
                      localStorage.setItem("arrClicked", arrString);
                      // setReset(arrClicked);
                      // setTimeout(() => {
                      //   setReset(idx);
                      // }, 100);
                    }}
                  >
                    <div className="d-flex justify-content-center">
                      {item ? (
                        <BiCheckboxChecked size={30} />
                      ) : (
                        <BiCheckbox size={30} />
                      )}
                    </div>
                  </Button>
                  <label>test{idx}</label>
                </div>
              </>
            );
          })}
        </>
      )}
*/
