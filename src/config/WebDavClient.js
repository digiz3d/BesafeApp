import { createClient, axios } from "webdav";
import { apiBaseURL } from "./config";

let client;

export async function setLoginPassword(login, password) {
  if (axios.default.headers && axios.default.headers.Cookie) {
    axios.default.headers.Cookie = "";
  }

  if (axios.headers && axios.headers.Cookie) {
    axios.headers.Cookie = "";
  }

  client = createClient(apiBaseURL, {
    username: login,
    password: password
  });

  const items = await client.getDirectoryContents("/");
  return items;
}

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
