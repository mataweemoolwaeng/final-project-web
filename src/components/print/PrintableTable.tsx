import React from "react";
import moment from "../../libs/moment";

const PrintableInventoryTable = ({ data }: { data: any[] }) => {
  return (
    <div className="font-serif w-full text-sm p-1 my-2">
      <div className="text-center">
        <div>รายการครุภัณฑ์ ประจำปีงบประมาณ {moment().add(543, "year").year()}</div>
        <div>สาขาวิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น</div>
        <div>ณ {moment().format('LL')}</div>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border text-center" rowSpan={2}>
              ที่
            </th>
            <th className="border text-center" rowSpan={2}>
              หน่วยงาน
            </th>
            <th className="border text-center" rowSpan={2}>
              วันที่ซื้อ
            </th>
            <th className="border text-center" rowSpan={2}>
              หมายเลขครุภัณฑ์
            </th>
            <th className="border text-center" rowSpan={2}>
              รายการ
            </th>
            <th
              className="border text-center"
              style={{ whiteSpace: "pre-line" }}
              rowSpan={2}
            >
              {`จำนวน /\nหน่วยนับ`}
            </th>
            <th className="border text-center" style={{ whiteSpace: "pre-line" }} rowSpan={2}>
              {`ราคาต่อ\nหน่วย`}
            </th>
            <th className="border text-center" rowSpan={2}>
              ราคารวม
            </th>
            <th className="border text-center" colSpan={2}>
              สภาพ
            </th>
            <th className="border text-center" style={{ whiteSpace: "pre-line" }} rowSpan={2}>
              {`สถานที่เก็บ/\nใช้งาน`}
            </th>
            <th className="border text-center" rowSpan={2}>
              หมายเหตุ
            </th>
          </tr>
          <tr>
            <th className="border text-center">ปกติ</th>
            <th className="border text-center">ชำรุด</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            return (
              <>
                <tr key={index}>
                  <th
                    className="border text-center text-center font-bold"
                    colSpan={12}
                  >
                    {item.branch}
                  </th>
                </tr>
                {item.list.map((itemData: any, indexData: number) => (
                  <tr key={indexData}>
                    <td className="border">{indexData + 1}</td>
                    <td className="border">
                      {itemData.department}
                    </td>
                    <td className="border">
                      {moment(itemData.purchaseDate).add(543, "year").format("DD/MM/YYYY")}
                    </td>
                    <td className="border">
                      {itemData.inventoryNumber}
                    </td>
                    <td className="border">
                      {itemData.name}
                    </td>
                    <td className="border text-center">
                      {itemData.quantity} {itemData.unit}
                    </td>
                    <td className="border text-right">
                      {itemData.unitPrice.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border text-right">
                      {itemData.totalPrice.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border text-center">
                      {itemData.condition ? "✓" : ""}
                    </td>
                    <td className="border text-center">
                      {!itemData.condition ? "✓" : ""}
                    </td>
                    <td className="border">
                      {itemData.location}
                    </td>
                    <td className="border">{itemData.notes}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrintableInventoryTable;
