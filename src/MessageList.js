import React, { useEffect, useState, useCallback } from "react";
import { apiSyncMessages } from "./api";

const isBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

export const MessageListItem = ({ ad, onClickSolveAd }) => {
  const { adId, message, probability, expiresIn, reward } = ad;
  return (
    <tr>
      <td>{isBase64(message) ? atob(message) : message}</td>
      <td>{expiresIn}</td>
      <td>{reward}</td>
      <td>{isBase64(probability) ? atob(probability) : probability}</td>
      <td>
        <button onClick={() => onClickSolveAd(adId)}>SOLVE</button>
      </td>
    </tr>
  );
};

export const MessageList = ({ gameId, handleSolveAd }) => {
  const [syncMessages, list] = useMessageList(gameId);

  const onClickSolveAd = useCallback(
    (adId) => {
      return handleSolveAd(gameId, adId).then((data) => {
        syncMessages();
        return data;
      });
    },
    [gameId, handleSolveAd, syncMessages]
  );

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
              ad={ad}
              onClickSolveAd={onClickSolveAd}
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
