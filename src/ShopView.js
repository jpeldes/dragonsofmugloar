import React, { useState } from "react";
import { useEffect } from "react";
import { apiSyncShop, apiBuyItem } from "./api";

const ShopListItem = ({ item, handleBuyItem }) => {
  const handleClick = () => handleBuyItem(item.id);
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.cost}</td>
      <td>
        <button onClick={handleClick}>Buy</button>
      </td>
    </tr>
  );
};

const ShopView = ({ gameId, handleGameUpdate }) => {
  const [shopItems, saveShop] = useState([]);
  useEffect(() => {
    apiSyncShop(gameId).then(saveShop);
  }, [gameId]);

  const handleBuyItem = (itemId) =>
    apiBuyItem(gameId, itemId).then((data) => {
      handleGameUpdate(data);
      return data;
    });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {shopItems.map((item) => (
            <ShopListItem
              key={item.id}
              item={item}
              handleBuyItem={handleBuyItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopView;
