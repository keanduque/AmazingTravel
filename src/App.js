import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
    { id: 4, description: "Baggage", quantity: 1, packed: false },
    { id: 5, description: "Socks", quantity: 2, packed: true },
];

const App = () => {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
};
const Logo = () => {
    return <h1>🏝️ Amazing Travel ⛱️</h1>;
};
const Form = () => {
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState(1);
    const [items, setItem] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            id: initialItems.length + 1,
            description,
            qty,
            packed: false,
        };
        setItem({ ...initialItems, newItem });

        console.log(items);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select onChange={(e) => setQty(Number(e.target.value))}>
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
const PackingList = () => {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
};
const Item = ({ item }) => {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
};
const Stats = () => {
    return (
        <footer className="stats">
            <em>
                💼 You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
};
export default App;
