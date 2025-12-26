import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (title === "" || amount === "") return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
      },
    ]);

    setTitle("");
    setAmount("");
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const totalAmount = filteredExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>💰 Personal Expense Tracker</h1>
        <p style={styles.subtitle}>
          Add, filter, and track your expenses
        </p>

        {/* Add Expense */}
        <input
          style={styles.input}
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          style={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button style={styles.button} onClick={addExpense}>
          Add Expense
        </button>

        {/* Filter */}
        <select
          style={{ ...styles.input, marginTop: "15px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        {/* Expense List */}
        {filteredExpenses.length === 0 ? (
          <p style={styles.empty}>No expenses found</p>
        ) : (
          <ul style={styles.list}>
            {filteredExpenses.map((e) => (
              <li key={e.id} style={styles.listItem}>
                <span>
                  {e.title} ({e.category})
                </span>
                <strong>₹{e.amount}</strong>
              </li>
            ))}
          </ul>
        )}

        {/* Total */}
        <div style={styles.total}>
          Total Amount Spent: ₹{totalAmount}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "5px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f2f2f2",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "8px",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: "15px",
  },
  total: {
    marginTop: "15px",
    fontWeight: "bold",
    textAlign: "right",
  },
};
