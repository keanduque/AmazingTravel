import { useState } from "react";
import Item from "./Item";

const PackingList = ({ items, onDeleteItems, onToggleItem, onClearList }) => {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "quantity")
        sortedItems = items
            .slice()
            .sort((a, b) => Number(b.qty) - Number(a.qty));
    if (sortBy === "description")
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed")
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.length > 0
                    ? sortedItems.map((item) => (
                          <Item
                              item={item}
                              key={item.id}
                              onDeleteItem={onDeleteItems}
                              onToggleItem={onToggleItem}
                          />
                      ))
                    : "No available List"}
            </ul>
            {items.length > 1 ? (
                <div className="actions">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="input">Sort by input order</option>
                        <option value="quantity">Sort by input quantity</option>
                        <option value="description">Sort by description</option>
                        <option value="packed">Sort by packed status</option>
                    </select>

                    <button onClick={onClearList}>Clear List</button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
export default PackingList;
