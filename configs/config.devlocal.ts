import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "http://15.165.198.145:8000";
const mode = "devlocal";
const loginRedirectUri = "http://localhost:3000/kakao"

const configDev = getConfigs({
  baseUrl,
  mode,
  loginRedirectUri
});

export default configDev;