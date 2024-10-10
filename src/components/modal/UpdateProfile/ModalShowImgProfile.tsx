import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../../config/fonts";

import images from "../../../config/index.images";
import { setURLProfile } from "../../../config/setURL_image";

function ModalShowImgProfile(props: any) {
  const { getProfile } = props;
  const [showImage, setShowImage] = useState<any>();
  // console.log(getProfile);

  useEffect(() => {
    let profile: any = getProfile;
    if (profile?.name_image) {
      const urlProfile = setURLProfile(profile?.name_image);
      setShowImage(urlProfile);
    }
  }, [getProfile]);
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          รูปโปรไฟล์ของ {getProfile?.firstname} {getProfile?.lastname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img
            src={showImage ? showImage : images.imageNotFound}
            className="rounded float-right"
            width={"80%"}
            height={"80%"}
            style={{
              objectFit: "cover",
              borderRadius: 15,
              borderColor: "#ced4da",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>ปิด</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalShowImgProfile;
