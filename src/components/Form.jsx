import { useState } from "react";

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
export default Form;
