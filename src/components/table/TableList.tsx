import { useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";

function TableList(props: any) {
  const { thTable, itemList, editPage } = props;
  const navigate = useNavigate();

  const navigatePage = (page: string, idItem?: any) => {
    navigate(page, { state: { id: idItem } });
  };
  return (
    <div style={{ margin: 30 }}>
      <Table
        style={{ paddingTop: 50, textAlign: "center", fontSize: 22 }}
        responsive="sm"
        striped
        bordered
        hover
      >
        {/*  */}
        <thead>
          <tr>
            {_.map(thTable, (item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        {/*  */}
        <tbody>
          {_.map(itemList, (item, index) => {
            // console.log(item);
            return (
              <tr key={index}>
                {_.map(item, (itm, idx) => {
                  // console.log("idx = " + idx);
                  return (
                    <>
                      {idx == "0" && (
                        <td>
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              navigatePage(editPage, index);
                            }}
                          >
                            <AiFillEdit color="red" size={20} />
                          </Button>
                        </td>
                      )}
                      <td key={index}>{itm}</td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/*  */}
      </Table>
    </div>
  );
}

export default TableList;

/*
<td>{item.id}</td>
                <td></td>
                <td>{item.code}</td>
                <td>{item.faculty}</td>
                <td>{item.department}</td>
                <td>{item.building}</td>
                <td>{item.location}</td>
                <td>{item.cost}</td>
                <td>{item.item_status}</td>
                <td>{item.creator}</td>
                <td>{item.created_at}</td>

*/

/*

*/
