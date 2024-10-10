import _ from "lodash";

export const filterStatus = (listItem: any, status: any) => {
  let statusItemArr = [];
  if (status == 0 || status == false) {
    for (let i = 0; i < listItem.length; i++) {
      let vauleNotNormal = _.filter(listItem[i].items, (item: any) => {
        return item.status_item == false;
      });
      statusItemArr.push(vauleNotNormal);
    }
  } else if (status == 1 || status == true) {
    for (let i = 0; i < listItem.length; i++) {
      let vauleNormal = _.filter(listItem[i].items, (item: any) => {
        return item.status_item == true;
      });
      statusItemArr.push(vauleNormal);
    }

    // statusItemArr = ;
  } else if (status == 2) {
    for (let i = 0; i < listItem.length; i++) {
      let vaulePendingSale = _.filter(listItem[i].items, (item: any) => {
        return item.status_item == 2;
      });
      statusItemArr.push(vaulePendingSale);
    }
    // statusItemArr = ;
  } else if (status == 3) {
    for (let i = 0; i < listItem.length; i++) {
      let vauleSoldOut = _.filter(listItem[i].items, (item: any) => {
        return item.status_item == 3;
      });
      statusItemArr.push(vauleSoldOut);
    }
  } else if (status == 4) {
    for (let i = 0; i < listItem.length; i++) {
      let vauleSoldOut = _.filter(listItem[i].items, (item: any) => {
        return (
          item?.code.length <= 9 ||
          item?.code.length == "-" ||
          item?.code.length == "ไม่มี"
        );
      });
      statusItemArr.push(vauleSoldOut);
    }
  }
  return statusItemArr;
};
