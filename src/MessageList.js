import React, { useEffect, useState } from "react";
import { apiSolveAd, apiSyncMessages } from "./api";

const isBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

const SolveButton = ({ handleSolveAd, adId }) => {
  const [text, setText] = useState("SOLVE");
  const handleClick = () =>
    handleSolveAd(adId)
      .then((data) => {
        if (data.success) {
          setText("√");
        } else {
          setText("x");
        }
      })
      .catch(() => {
        setText("x");
      });
  return (
    <button disabled={text !== "SOLVE"} onClick={handleClick}>
      {text}
    </button>
  );
};

export const MessageListItem = ({ ad, handleSolveAd }) => {
  return (
    <tr>
      <td>{isBase64(ad.message) ? atob(ad.message) : ad.message}</td>
      <td>{ad.expiresIn}</td>
      <td>{ad.reward}</td>
      <td>{isBase64(ad.probability) ? atob(ad.probability) : ad.probability}</td>
      <td>
        <SolveButton handleSolveAd={handleSolveAd} adId={ad.adId} />
      </td>
    </tr>
  );
};

export const MessageList = ({ gameId, handleGameUpdate }) => {
  const [syncMessages, list] = useMessageList(gameId);

  const handleSolveAd = (adId) =>
    apiSolveAd(gameId, adId)
      .then((data) => {
        handleGameUpdate(data);
        return data;
      })
      .then(syncMessages);

  return (
    <div className="messagelist">
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Expires</th>
            <th>Reward</th>
            <th>Difficulty</th>
            <th>Solve?</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ad) => (
            <MessageListItem
              key={ad.adId}
              gameId={gameId}
              ad={ad}
              handleSolveAd={handleSolveAd}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const useMessageList = (gameId) => {
  const [list, setList] = useState([]);
  const syncMessages = () => apiSyncMessages(gameId).then(setList);
  useEffect(() => {
    apiSyncMessages(gameId).then(setList);
  }, [gameId]);

  return [syncMessages, list];
};
