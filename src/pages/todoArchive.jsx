import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomLoader from "../components/customLoader";

export default function TodoArchivePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // change todo data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const check = await axios.get(`http://localhost:8008/api/todos/${id}`);
        console.log("🚀 ~ check:", check);
        if (check.data && check.data.isArchived !== undefined) {
          if (check.data.isArchived) {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${id}/unarchive`
            );
            if (response.status === 200 || response.status === 204) {
              toast.warning("task updated successfully UnArchived ");
              navigate("..", { replace: true });
            }
          } else {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${id}/archive`
            );
            if (response.status === 200 || response.status === 204) {
              toast.success("task updated successfully Archived ");
              navigate("..", { replace: true });
            }
          }
        } else {
          throw new Error("Invalid response from the server");
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        toast.error(`~ error archive task : ${error.message}`);
        navigate("/todo", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  if (loading) return <CustomLoader />;
  return;
}
