import axios from "axios";
import { MapData } from "../models";

function getMapData(): Promise<MapData> {
  let api = "https://fyo2kjynpe.execute-api.us-east-1.amazonaws.com/dev/api";
  if (process.env.dev) {
    let requestDomain = document.domain;
    if (process.env.API_PORT) {
      requestDomain += `:${process.env.API_PORT}`;
    }
    api = `http://${requestDomain}/dev/api`;
  }

  return axios(api).then((result) => result.data);
}

export default {
  getMapData,
};
