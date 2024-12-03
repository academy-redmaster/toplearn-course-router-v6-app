import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomLoader from "../components/customLoader";

export default function TodoDeletePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // change data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.delete(
          `http://localhost:8008/api/todos/${id}`
        );
        if (response.status === 200 || response.status === 204) {
          toast.success(`the todo : ${id} delete`);
          navigate("..", { replace: true });
        }
      } catch (error) {
        toast.error(`~ error : ${error.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  if (loading) return <CustomLoader />;
  return;
}
