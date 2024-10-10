import { baseURL } from "../axios/config";
import env from "react-dotenv";

export const setURLProfile = (name_image: string) => {
  const url: string = `${baseURL}/images/profiles/${name_image}`;
  return url;
};

export const setURLItem = (name_image: string) => {
  const url: string = `${baseURL}/images/items/${name_image}`;
  return url;
};

export const setURLItemDamaged = (name_image: string) => {
  const url: string = `${baseURL}/images/damaged/${name_image}`;
  return url;
};
