import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
export default App;
