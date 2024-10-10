import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";
import _ from "lodash";
import colors from "../../config/colors";
import axios from "axios";
import { API } from "../../axios/swr/endpoint";
import configAxios from "../../axios/configAxios";
import PrintableTable from "./PrintableTable";

export const ComponentToPrint = ({ checkedData }: { checkedData: any }) => {
  const contentToPrint = useRef(null);
  const [data, setData] = React.useState<any>([]);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const printCheckBox = async (checkeds: any) => {
    if (!checkeds) {
      return;
    }
    // filter only id that checked is true
    const filterIds = checkeds
      .filter((item: any) => item.click)
      .map((item: any) => item.id);

    // const result = await configAxios("post", "/api/qr/print", checkeds);
    const result = await axios(
      configAxios("post", API.getItemsByIds, {
        ids: filterIds,
      })
    );

    if (result.data.length === 0) {
      return;
    }

    console.log(result.data);

    // filter by department first
    const filterByDepartment = _.groupBy(result.data, "department.nameTH");

    const data = Object.keys(filterByDepartment).map((key) => {
      return {
        branch: key,
        list: filterByDepartment[key].map((item: any) => {
          return {
            department: item.department.nameTH,
            purchaseDate: item.createdAt,
            name: item.name,
            inventoryNumber: item.code,
            quantity: item.typeitem.quantity,
            unit: item.typeitem.unit,
            unitPrice: item.typeitem.price_unit,
            totalPrice: item.typeitem.total_price,
            condition: item.status_item,
            location: item.location.nameTH,
            notes: item.description,
          };
        }),
      };
    });

    setData(data);

    setTimeout(() => {
      handlePrint(null, () => contentToPrint.current);
    }, 500);
  };

  return (
    <>
      <div style={{ display: "none", width: "100%" }} className="hidden">
        <div ref={contentToPrint}>
          <PrintableTable data={data} />
        </div>
      </div>
      <Button
        style={{ color: colors.black }}
        className="m-2"
        size="lg"
        variant={"outline-primary"}
        onClick={() => {
          printCheckBox(checkedData);
        }}
      >
        สั่งพิมพ์
      </Button>
    </>
  );
};
