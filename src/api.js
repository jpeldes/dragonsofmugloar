import axios from "axios";

export const apiGameStart = () =>
  axios
    .post("https://dragonsofmugloar.com/api/v2/game/start")
    .then(({ data }) => data);

export const apiSyncMessages = (gameId) =>
  axios
    .get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(({ data }) => data);

export const apiSolveAd = (gameId, adId) =>
  axios
    .post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${adId}`)
    .then(({ data }) => data);
