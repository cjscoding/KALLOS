import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";
import { apiInstance } from "../../api/index";

const api = apiInstance();

import {
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  styled,
} from "@mui/material";

import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  web3,
} from "../../web3Config";
import { IMyKallosData } from "../../interfaces";
import { getItemDetail } from "../../store/modules/item";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemReducer.itemDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItemDetail: (obj) => dispatch(getItemDetail(obj)),
  };
};

const style = {
  //   position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const ColorButton = styled(Button)({
  backgroundColor: "#F9E6E1",
  color: "black",
  "&:hover": {
    backgroundColor: "#F9E6E1",
    color: "black",
  },
});

// interface SaleKallosCardProps extends IMyKallosData {
//   account: string;
//   getOnSaleTokens: () => Promise<void>;
//   itemDetail: any;
//   setItemDetail: any;
// }

const ItemDetail = ({
  account,
  itemDetail,
  setItemDetail,
  getOnSaleTokens,
}) => {
  const router = useRouter();
  const [isNotBuyable, setIsNotBuyable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    title: "",
    authorName: "",
    itemImg: "",
    description: "",
    price: "",
  });
  const [tokenId, setTokenId] = useState("");

  const onShowModal = () => setShowModal(!showModal);
  const onShowAlert = () => alert("이미 구매하신 작품입니다");

  //해당 토큰 아이디에 대한 소유자 주소 반환 후
  //현 사용자와 일치하는 지 여부 확인(다른 사람이면 살 수 있도록)
  const getKallosTokenOwner = async () => {
    try {
      const response = await mintKallosTokenContract.methods
        .ownerOf(tokenId)
        .call();

      setIsNotBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  //구매 로직
  const onClickBuy = async () => {
    setShowModal(!showModal);
    try {
      if (!account) return;

      const response = await saleKallosTokenContract.methods
        .purchaseKallosToken(tokenId)
        .send({ from: account, value: itemDetail.price });

      if (response.status) {
        getOnSaleTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   const getItemInfo = () => {
  //     setItemDetail(tokenId);
  //   };

  const getDetail = async (tokenId) => {
    await api
      .get(`/item/detail/${tokenId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // await api
    //   .post(`/user/register`, obj)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // await api
    //   .put(`item/buy`, obj)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // await api
    //   .put(`item/sell`, obj)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    let tokenId = "43";
    setItemDetail(tokenId);
  }, [router.isReady]);

  useEffect(() => {
    setItemInfo(itemDetail);
    console.log(itemInfo);
  }, [itemDetail]);

  return (
    <Box sx={{ padding: "150px 200px", paddingTop: "0", height: "100%" }}>
      <Typography sx={{ marginTop: "200px", fontSize: "45px" }}>
        {itemInfo.title}
      </Typography>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            alignItems: "center",
            height: "100%",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              width: "400px",
              height: "400px",
            }}
          >
            <Image
              src={`https://kallosimages.s3.ap-northeast-2.amazonaws.com/calligraphyImages/32030e1d-674b-4ea4-beef-b0910ec9d53c.jpg`}
              width="100%"
              height="100%"
              alt="token image"
              layout="responsive"
            />
          </Box>
          <Box
            sx={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "400px",
              padding: "30px",
              border: "1px solid #cfd4d1",
              borderRadius: "10px",
              width: "inherit",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "repeat(4, 1fr)",
                height: "inherit",
                columnGap: 1,
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>제목</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo.title}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>작가</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo.authorName}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>작품 소개</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo.description}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>가격</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo.price} MATIC
              </Typography>
            </Box>
            {isNotBuyable ? (
              <ColorButton
                variant="contained"
                size="large"
                onClick={onShowAlert}
              >
                구매완료
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                size="large"
                onClick={onShowModal}
              >
                구매하기
              </ColorButton>
            )}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showModal}
              onClose={onShowModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showModal}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    정말 해당 작품을 구매하시겠습니까?
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    해당 제품은 구매 취소 또는 환불이 불가합니다.
                  </Typography>
                  <ColorButton
                    variant="contained"
                    sx={{ marginTop: "20px" }}
                    onClick={onClickBuy}
                  >
                    구매하기
                  </ColorButton>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
        <style jsx>
          {`
            .detailContainer {
              padding: 150px 200px;
              padding-top: 0;
              height: 100%;
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);