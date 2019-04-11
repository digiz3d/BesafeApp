import { createClient, axios } from "webdav";
import { apiBaseURL } from "./config";
import { encode } from "base-64";

let client;
let testUser = false;
const fakeFiles = [{ filename: "okok.jpg" }, { filename: "ouioui.jpg" }];
const fakePhotos = [{ filename: "okok.jpg" }, { filename: "ouioui.jpg" }];
const fakeVids = [{ filename: "okok.mp4" }, { filename: "ouioui.mp4" }];

export async function setLoginPassword(login, password) {
  if (login.toLowerCase() === "test" && password.toLowerCase() === "test") {
    testUser = true;
    return fakeFiles;
  }

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
  if (testUser) {
    return fakeVids;
  }
  if (!client) return false;

  const items = await client.getDirectoryContents("Videos/");
  return items;
}

export async function getPictures() {
  if (testUser) {
    return fakePhotos;
  }
  if (!client) return false;

  const items = await client.getDirectoryContents("Photos/");
  return items;
}

export function getPictureURL(name) {
  const downloadLink = client.getFileDownloadLink(name);
  console.warn(downloadLink);
  return downloadLink;
}

export async function getPictureBase64(name) {
  const pic = await client.getFileContents(name);
  console.warn("pic vaut ça : "+ pic);
  let string = String.fromCharCode(...new Uint8Array(pic))
  let base64String = encode(string);

  console.warn(base64String);

  return "data:image/jpg;base64," + base64String;
}
