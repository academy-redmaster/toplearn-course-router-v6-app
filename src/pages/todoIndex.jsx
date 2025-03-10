import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { Chip } from "@heroui/chip";
import CustomLoader from "../components/customLoader";
import TableTodo from "../components/tableTodo";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "DUEDATE", uid: "dueDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TodoIndexPage() {
  const { userId } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("🚀 ~ TodoIndexPage ~ error:", error);
  const location = useLocation();

  // useMatch

  const match = useMatch("todo");
  console.log("🚀 ~ TodoIndexPage ~ match:", match);

  // get todos
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = location.search;
        const response = await axios.get(
          `http://localhost:8008/api/todos${queryParams}`
        );
        setTodos(response.data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [location.search]);

  return (
    <div className="space-y-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-secondary">
          Todo List: <span className="text-sm">{userId}</span>
        </h1>
        <Chip color="danger" variant="shadow" size="lg" className="text-xl">
          {todos.length}
        </Chip>
      </div>
      {loading ? (
        <CustomLoader />
      ) : (
        <TableTodo columns={columns} todos={todos} />
      )}
    </div>
  );
}
