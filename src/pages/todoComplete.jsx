import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomLoader from "../components/customLoader";

export default function TodoCompletePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // change data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const check = await axios.get(`http://localhost:8008/api/todos/${id}`);
        if (check.data && check.data.isCompleted !== undefined) {
          if (check.data.isCompleted) {
            toast.info("the task is already completed, no change made.");
            navigate("..", { replace: true });
          } else {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${id}/complete`
            );
            if (response.status === 200 || response.status === 204) {
              toast.success("task updated successfully");
              navigate("..", { replace: true });
            }
          }
        } else {
          throw new Error("Invalid response from the server");
        }
        console.log("🚀 ~ check:", check);
      } catch (error) {
        toast.error(`~ error complete task: ${error.message}`);
        navigate("/todo", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  if (loading) return <CustomLoader />;
  return;
}
