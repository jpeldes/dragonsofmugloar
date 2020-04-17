import React, { useState } from "react";
import { useEffect } from "react";
import { apiSyncShop } from "./api";

const ShopListItem = ({ item, onClickBuyItem }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.cost}</td>
      <td>
        <button onClick={() => onClickBuyItem(item.id)}>Buy</button>
      </td>
    </tr>
  );
};

const ShopView = ({ gameId, handleBuyItem }) => {
  const [shopItems, saveShop] = useState([]);
  useEffect(() => {
    apiSyncShop(gameId).then(saveShop);
  }, [gameId]);

  const onClickBuyItem = (itemId) => handleBuyItem(gameId, itemId);

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
              onClickBuyItem={onClickBuyItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopView;
