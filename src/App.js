import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", qty: 2, packed: false },
    { id: 2, description: "Socks", qty: 12, packed: false },
];

const App = () => {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }
    function handleDeleteItems(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }
    function handleClearList() {
        let confirmed;
        if (items.length > 0) {
            confirmed = window.confirm(
                "Are you sure you want to delete all items?"
            );

            if (confirmed) setItems([]);
        } else {
            alert("Start adding some items to your packing list 🚀");
        }
    }
    return (
        <div className="app">
            <Logo />
            <Form items={items} onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItems}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
        </div>
    );
};
const Logo = () => {
    return <h1>🏝️ Amazing Travel ⛱️</h1>;
};
const Form = ({ onAddItems }) => {
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            id: Date.now(),
            description,
            qty,
            packed: false,
        };

        onAddItems(newItem);

        setDescription("");
        setQty(1);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
};
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
const Item = ({ item, onDeleteItem, onToggleItem }) => {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={(e) => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.qty} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
};
const Stats = ({ items }) => {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your packing list 🚀</em>
            </p>
        );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);
    return (
        <footer className="stats">
            <em>
                {percentage === 100
                    ? "You got everything! Ready to go ✈️"
                    : `💼 You have ${numItems} items on your list, and you already
                    packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
};
export default App;
