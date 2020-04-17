import React, { useCallback } from "react";

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
      <td>{isBase64(message) ? message : message}</td>
      <td>{expiresIn}</td>
      <td>{reward}</td>
      <td>{isBase64(probability) ? probability : probability}</td>
      <td>
        <button onClick={() => onClickSolveAd(adId)}>SOLVE</button>
      </td>
    </tr>
  );
};

export const MessageList = ({ messages, handleSolveAd }) => {
  const onClickSolveAd = useCallback((adId) => handleSolveAd(adId), [
    handleSolveAd,
  ]);
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
          {messages.map((ad) => (
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
