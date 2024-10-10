import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { Container, Button } from "react-bootstrap";
import UpdateImgProfile from "../../../../components/modal/UpdateProfile/UpdateImgProfile";
import { setURLProfile } from "../../../../config/setURL_image";
import images from "../../../../config/index.images";

function ShowImgProfile(props: any) {
  const { getProfile, switchUpdateData } = props;

  // const [showProfile, setShowProfile] = useState<any>();
  const [showImage, setShowImage] = useState<any>();
  const [modalShowUpdateImg, setModalShowUpdateImg] = useState(false);

  useEffect(() => {
    let profile: any = getProfile;
    // setShowProfile(profile);
    // console.log(profile?.name_image);
    if (profile?.name_image) {
      const urlProfile = setURLProfile(profile?.name_image);
      setShowImage(urlProfile);
    }
  }, [getProfile]);

  const switchData = () => {
    switchUpdateData();
  };

  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      {modalShowUpdateImg && (
        <UpdateImgProfile
          switchData={switchData}
          getProfile={getProfile}
          show={modalShowUpdateImg}
          onHide={() => setModalShowUpdateImg(false)}
        />
      )}
      <div className="d-flex justify-content-center">
        <img
          src={showImage ? showImage : images.imageNotFound}
          className="rounded float-right"
          width={200}
          height={200}
          style={{
            objectFit: "cover",
            borderRadius: 15,
            borderColor: "#ced4da",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        />
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Button
          onClick={() => {
            setModalShowUpdateImg(true);
          }}
          variant="light"
        >
          <span>เปลี่ยนรูปภาพ</span> <CiCamera size={25} />
        </Button>
      </div>
    </Container>
  );
}

export default ShowImgProfile;
