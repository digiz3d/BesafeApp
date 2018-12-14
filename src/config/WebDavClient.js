import axios from "axios";
import { createClient } from "webdav";
import { apiBaseURL } from "./config";

let client;

export function setLoginPassword(login, password) {
  client = createClient(apiBaseURL, {
    username: login,
    password: password
  });
}

setLoginPassword("root", "root");

export async function getVideos() {
  if (!client) return false;

  const items = await client.getDirectoryContents("Videos/");
  return items;
}

export async function getPictures() {
  if (!client) return false;

  const items = await client.getDirectoryContents("Photos/");
  return items;
}



/*
import * as base64 from "base-64";

const api = axios.create({
  baseURL: apiBaseURL,
  validateStatus: () => true
});

export function setLoginPassword(login, password) {
  api.default.header.common.Authorization =
    "Basic " + base64.encode(login + ":" + password);
}
*/
