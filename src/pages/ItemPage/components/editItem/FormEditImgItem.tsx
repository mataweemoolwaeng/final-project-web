import images from "../../../../config/index.images";
import getBase64 from "../../../../config/getBase64";
import { setURLItem } from "../../../../config/setURL_image";
import { useState, useEffect } from "react";
import { Button, Form, Container, Card, Figure } from "react-bootstrap";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import _ from "lodash";
import ModalShowImgItem from "../../../../components/modal/ModalShowImgItem";

function FormEditImgItem(props: any) {
  const {
    getItems,
    setModalShowCheckUpImgItem,
    setPostEditImgItemCheck,
    setPostEditImgItem,
    postEditImgItemFn,
    setedit_updateEn,
    edit_updateEn,
  } = props;
  const [showFile, setShowFile] = useState<any>();

  // console.log("showImage = " + showImage);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [showImage, setShowImage] = useState<any>();

  const [modalShowImgArr, setModalShowImgArr] = useState<any>();
  const [modalShowImg, setModalShowImg] = useState<boolean>(false);
  useEffect(() => {
    let itemFilter: any = _.filter(
      getItems.img_items,
      (item: any, index: any) => {
        return index >= 0;
      }
    );

    setShowImage(itemFilter);
    // console.log(itemFilter);
  }, [getItems]);
  useEffect(() => {
    setSelectedFile(undefined);
    setShowFile(undefined);
  }, [postEditImgItemFn]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    let id: any = localStorage.getItem("itemItemEdit");
    // console.log(id);

    const obj = {
      name: getItems?.name,
      images: showFile,
    };

    // console.log(obj);
    // console.log(id);
    // console.log(selectedFile);
    let dataform = new FormData();
    dataform.append("itemItemId", id);
    dataform.append("images", selectedFile);

    // console.log(dataform);
    setPostEditImgItem(dataform);
    setPostEditImgItemCheck(obj);
    setModalShowCheckUpImgItem(true);
  };
  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      {modalShowImg && (
        <ModalShowImgItem
          title={"รูปครุภัณฑ์ " + getItems?.name}
          showImg={modalShowImgArr}
          show={modalShowImg}
          onHide={(status: number) => {
            setModalShowImg(false);
            if (status == 1) {
              setedit_updateEn(!edit_updateEn);
            }
          }}
        />
      )}
      <div className="d-flex justify-content-center">
        <Card
          className=""
          style={{
            width: "85%",
            height: 350,
            display: "flex",
            overflow: "auto",
          }}
        >
          <div className="d-flex justify-content-center flex-wrap">
            {_.map(showImage, (item: any, idx: any) => {
              return (
                <>
                  <Button
                    variant="outline-dark"
                    className="m-1"
                    onClick={() => {
                      // console.log(item);
                      setModalShowImgArr(item);
                      setModalShowImg(true);
                    }}
                  >
                    <Figure key={idx}>
                      <Figure.Image
                        width={200}
                        height={200}
                        alt="200x200"
                        src={setURLItem(item.name_image_item)}
                      />
                    </Figure>
                  </Button>
                </>
              );
            })}
          </div>
        </Card>
      </div>
      {/*  */}
      <div className="d-flex justify-content-center mt-3">
        <img
          src={showFile ? showFile : images.upLoadImg}
          width={200}
          height={160}
          alt="200x200"
          style={{
            objectFit: "cover",
            borderRadius: 5,
            borderColor: "#ced4da",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <Form.Group controlId="formFile" className="mt-2">
            <Form.Label>
              <span style={{ fontSize: 18 }}>แนะนำอัตราส่วนภาพ 1 : 1</span>
            </Form.Label>
            <Form.Control
              // value={}
              accept="image/png,image/jpeg,image/jpg"
              placeholder="เลือกรูปภาพ"
              size="lg"
              type="file"
              onChange={(e: any) => {
                // console.log(e.target.files[0]);
                getBase64(e.target.files[0], (result: any) => {
                  // console.log(result);
                  setShowFile(result);
                });
                // console.log(e.target.files[0].name);
                setSelectedFile(e.target.files[0]);
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              // style={{}}
              onClick={(event) => {
                if (selectedFile) {
                  onSubmit(event);
                } else {
                  event.preventDefault();
                  sweet_basic("warning", "ยังไม่มีรูปภาพ", "กรุณาเพิ่มรูปภาพ");
                }
              }}
              className="mb-3 mt-3"
              variant={selectedFile ? "success" : "secondary"}
              type="submit"
              size="lg"
            >
              {selectedFile ? "บันทึก" : "ยังไม่ได้เพิ่มรูปภาพ"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default FormEditImgItem;
