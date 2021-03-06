/* eslint-disable */
import React, { useEffect, useState } from "react";
import FormData from "form-data";
import {
  Box,
  Button,
  Container,
  createTheme,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import defaultImage from "../public/images/default-image.jpg";
import Image from "next/image";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { mintKallosTokenContract } from "web3Config";
import { addNewItem } from "@/store/modules/item";
import { connect } from "react-redux";
import LoadingInterface from "@/components/LoadingInterface";
import Router from "next/router";
import { ThemeProvider } from "@emotion/react";
import styled from "styled-components";
import { PROJECT_ID, PROJECT_SECRET, BACKEND_URL } from "../config/index";
import axios from "axios";
import { getKallosTokenContract } from "web3Config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3C51",
    },
    secondary: {
      main: "#F9E6E1",
    },
  },
  typography: {
    fontFamily: "Gowun Batang",
  },
});

const StyledButton = styled(Button)`
  background-color: "#F9E6E1";
  color: #000000;
  padding: 10px 25px;
  &:hover {
    background-color: #ffece6;
  }
`;

interface NewItemInfo {
  title: string;
  artist: string;
  privateKey: string;
  keyword: string;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // addNewItem: (itemInfo) => addNewItem(itemInfo),
  };
};

const ipfsClient = require("ipfs-http-client");
const auth =
  "Basic " + Buffer.from(PROJECT_ID + ":" + PROJECT_SECRET).toString("base64");

const client = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

client.pin.add("QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn").then((res) => {
  //   console.log(res);
});

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ account }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState<string>("");

  //????????? ????????????
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImage,
  });
  const [loaded, setLoaded] = useState(false);
  let inputRef: any;

  // ?????? ?????? ??? ?????? false: ?????? X, true: ?????? ???
  const [createLoad, setCreateLoad] = useState<Boolean>(false);

  async function onChange(e) {
    const file = e.target.files[0];
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    let new_image;
    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded(true);
    };
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      //   console.log("file url:", fileUrl);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const createMint = async () => {
    // const { name, description } = formInput;
    if (!title || !description || !fileUrl) return; // console.log("?????? ????????????")

    const data = JSON.stringify({
      title,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      //   console.log("url???", url);
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createSale = async (url) => {
    try {
      const response = await mintKallosTokenContract.methods
        .mintKallosToken(url)
        .send({ from: account })
        // Metamask Confirm ????????? ???????????? ????????? ????????????
        .on("transactionHash", () => {
          setCreateLoad(true);
        });
      if (response.status) {
        // Router.push("/mypage");
        getKallosTokens();
      }
    } catch (error) {
      // ?????? ????????? 4001(reject)??? ??? ?????? ??????
      // if (error.code === 4001) {
      //   setCreateLoad(false);
      // }
      console.error(error);
    }
  };
  // ?????? ?????? ????????????
  const getArtistDetail = async (account) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/user/artist/${account}`);
      //   console.log("artist Detail: ", res);
      setArtistName(res.data.name);
    } catch (err) {
      console.log(err);
    }
  };
  // ??????id????????????
  const [kallosTokens, setKallosTokens] = useState([]);
  const [tokenId, setTokenId] = useState("");

  const getKallosTokens = async () => {
    try {
      const response = await getKallosTokenContract.methods
        .getKallosTokens(account)
        .call();

      //   console.log("???????????????", response);

      setKallosTokens(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (kallosTokens.length === 0) return;
    setTokenId(kallosTokens[kallosTokens.length - 1][0]);
    // console.log("!!!", kallosTokens[kallosTokens.length -1][0])
  }, [kallosTokens]);

  useEffect(() => {
    if (tokenId === "") return;
    sendItemDetail();
  }, [tokenId]);

  // useEffect(() => {
  //   getKallosTokens();
  // }, []);

  // ????????? ?????????(????????????) ?????? ?????? ????????? ???????????? ????????? ?????????
  const sendItemDetail = async () => {
    const form = new FormData();
    form.append("address", account);
    form.append("name", artistName); // ?????????
    form.append("title", title);
    form.append("description", description);
    form.append("tokenId", tokenId); // tokenId
    form.append("file", image.image_file);
    await axios
      .post(`${BACKEND_URL}/item/create`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log("??????!!", res);
        Router.push("/mypage");
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   sendItemDetail();
  // }, []);

  useEffect(() => {
    getArtistDetail(account);
  }, [account]);

  // console.log("!!!!!!", artistDetail)
  return (
    <ThemeProvider theme={theme}>
      {createLoad ? (
        <>
          <LoadingInterface />
          <Typography variant="h6" align="center">
            ?????? ????????? ???????????? ?????????????????? ???????????????.
          </Typography>
        </>
      ) : (
        <Box sx={{ my: 18, mx: 25 }}>
          <Typography variant="h3">?????? ????????????</Typography>
          <Container>
            <Stack direction="row" sx={{ mt: 10 }}>
              <Typography variant="h5" sx={{ mr: 14 }}>
                ?????? ??????
              </Typography>
              <Stack>
                <Typography
                  variant="caption"
                  sx={{ marginBottom: 1, color: "Grey" }}
                >
                  ????????? ????????? ?????????: JPG, JPEG, PNG
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  ref={(refParam) => (inputRef = refParam)}
                  onChange={onChange}
                  style={{ display: "none" }}
                />
                <div style={{ cursor: "pointer" }}>
                  {loaded === false || loaded === true ? (
                    <Image
                      src={image.preview_URL}
                      alt="preview-image"
                      width="350"
                      height="350"
                      onClick={() => inputRef.click()}
                    />
                  ) : (
                    <span>???????????? ???????????? ????????????.</span>
                  )}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ my: 8 }}>
              <Typography variant="h5" sx={{ mr: 7.7 }}>
                ?????????
              </Typography>
              <Typography variant="h5" sx={{ ml: 10, width: 700 }}>
                {artistName}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography variant="h5">?????????</Typography>
              <TextField
                required
                variant="standard"
                sx={{ ml: 17, width: 700 }}
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
            </Stack>
            <Stack direction="row" sx={{ my: 8 }}>
              <Typography variant="h5">??????</Typography>
              <TextField
                required
                variant="standard"
                sx={{ ml: 20, width: 700 }}
                onChange={(e) => setDescription(e.target.value)}
              ></TextField>
            </Stack>
          </Container>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <StyledButton
              onClick={createMint}
              variant="contained"
              size="large"
              sx={{ mr: 30, mb: 5 }}
              color="secondary"
            >
              ????????????
            </StyledButton>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default connect(null, mapDispatchToProps)(Create);
