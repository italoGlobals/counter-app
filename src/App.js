import { useEffect, useState } from "react";

const COUNT_KEY = "count";
const DEBOUNCE_DELAY = 500;
const SIMULATED_DELAY = 3000;

export default function App() {
  const initialCount = +localStorage.getItem(COUNT_KEY) || 0;
  const [count, setCount] = useState(initialCount);
  const [debouncedCount, setDebouncedCount] = useState(count);

  const saveCount = async (num) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(COUNT_KEY, +num);
        resolve();
      }, SIMULATED_DELAY);
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCount(count);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [count]);

  useEffect(() => {
    (async () => await saveCount(debouncedCount))();
  }, [debouncedCount]);

  return (
    <main>
      <h1>{count}</h1>
      <div className="button-container">
        <button 
          onClick={() => setCount((c) => c + 1)} 
          className="increment"
        >
          +
        </button>
        <button 
          onClick={() => setCount((c) => c - 1)} 
          className="decrement"
        >
          -
        </button>
      </div>
    </main>
  );
}
