import { Form, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import _ from "lodash";

// import React from 'react'
function PaginationItem(props: any) {
  const { paginationCount, setItemList, setCheckeds } = props;

  const [cilckActive, setCilckActive] = useState<any>(1);
  useEffect(() => {
    let isList: any = localStorage.getItem("paginationItem");
    // console.log(paginationCount.length);

    if (paginationCount.length == 1) {
      isList = Number(1);
    } else isList = Number(isList);
    // console.log(isList);
    if (isList > 1) {
      setCilckActive(isList);
      setItemList(isList);
    }
  }, []);
  const setActivePage = (page: any, idx?: any, item?: any) => {
    // console.log("page: " + page + " idx: " + idx + " item: " + item);
    // console.log(page);
    setCheckeds(undefined)
    localStorage.setItem("paginationItem", page);
    setCilckActive(page);
    setItemList(page);
    // setItemList()
  };
  // console.log(paginationCount);

  const isPage: any = localStorage.getItem("paginationItem");
  return (
    <>
      <Pagination className="d-flex flex-wrap">
        <Pagination.Prev
          onClick={() => {
            if (isPage != 1)
              setActivePage(Number(isPage) - 1, undefined, undefined);
          }}
        />
        {_.map(paginationCount, (item, idx: any) => {
          return (
            <div key={idx + 1}>
              {cilckActive == idx + 1 ? (
                <Pagination.Item active>{idx + 1}</Pagination.Item>
              ) : (
                <>
                  {idx >= 7 ? (
                    <>
                      {idx == 7 && (
                        <Pagination.Ellipsis
                          onClick={() => {
                            if (isPage < paginationCount.length)
                              setActivePage(
                                Number(isPage) + 1,
                                undefined,
                                undefined
                              );
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <Pagination.Item
                      // href="#"
                      onClick={() => {
                        setActivePage(idx + 1, idx, item);
                        // location.reload();
                      }}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  )}
                </>
              )}
            </div>
          );
        })}
        <Pagination.Next
          onClick={() => {
            if (isPage < paginationCount.length)
              setActivePage(Number(isPage) + 1, undefined, undefined);
          }}
        />
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              กรอกเลขหน้า มีทั้งหมด {paginationCount.length} หน้า
            </Tooltip>
          }
        >
          <Form.Control
            className="mx-2"
            type="number"
            min={"1"}
            max={paginationCount.length}
            style={{ width: 75 }}
            placeholder={isPage}
            value={isPage}
            onChange={(event: any) => {
              const value = event.target.value;
              setActivePage(Number(value), undefined, undefined);
            }}
            // disabled
          />
        </OverlayTrigger>
      </Pagination>
    </>
  );
}
/*
   <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
*/
export default PaginationItem;
