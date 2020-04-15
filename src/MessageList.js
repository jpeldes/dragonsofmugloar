import React, { useEffect, useState } from "react";
import { apiSolveAd, apiSyncMessages } from "./api";

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
      <td>{ad.reward}</td>
      <td>{ad.message}</td>
      <td>{ad.expiresIn}</td>
      <td>{ad.probability}</td>
      <td>
        <SolveButton handleSolveAd={handleSolveAd} adId={ad.adId} />
      </td>
    </tr>
  );
};

export const MessageList = ({ gameId, handleGameUpdate }) => {
  const handleSolveAd = (adId) =>
    apiSolveAd(gameId, adId).then((data) => {
      handleGameUpdate(data);
      return data;
    });

  const [syncMessages, list] = useMessageList(gameId);

  return (
    <div className="messagelist">
      <table>
        <thead>
          <tr>
            <th>Reward</th>
            <th>Message</th>
            <th>Tries</th>
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
      <div>
        <button onClick={syncMessages}>Sync messages</button>
      </div>
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
