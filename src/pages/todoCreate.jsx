import {
  Card,
  Input,
  Spacer,
  Textarea,
  Select,
  SelectSection,
  SelectItem,
  DatePicker,
  Button,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import imageUrl from "../assets/image/coffee.png";
import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "../components/customLoader";

export default function TodoCreatePage() {
  const { userId, isTokenExpired, loading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // useMatch
  const match = useMatch("todo/:id/edits");
  console.log("🚀 ~ TodoIndexPage ~ match:", match);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "low",
    owner: "",
  });
  // ====================================
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        owner: userId,
      }));
    }
    // حالت edit
    if (id) {
      setIsLoading(true);
      try {
        axios.get(`http://localhost:8008/api/todos/${id}`).then((reponse) => {
          setFormData(reponse.data);
        });
      } catch (e) {
        setError(`errror edit todo: ${e}`);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [location.pathname, userId, id]);
  // ====================================
  // handle input and textarea value
  // ====================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ================================================
  // handle submit form
  // ================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (id) {
      await axios.put(`http://localhost:8008/api/todos/${id}`, formData);
      toast.warning("todo edit");
      navigate("..", { replace: true });
    } else {
      // create
      try {
        await axios.post("http://localhost:8008/api/todos", formData);
        toast.success("todo create");
        navigate("..", { replace: true });
      } catch (e) {
        setError(`errror fetching todo: ${e}`);
        toast.error(error);
      } finally {
        setIsLoading(false);
        setFormData({});
      }
    }
  };
  if (loading || isLoading) return <CustomLoader />;
  if (isTokenExpired) {
    toast.error("token expired ...");
    return navigate("/login", { replace: true });
  }
  return (
    <div className="w-full min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 p-10 lg:px-0">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">{id ? "Edit page" : "Create New Todo"}</h1>
        <img src={imageUrl} className="w-1/2 object-contain" alt="" />
      </div>
      <div className="w-full h-full">
        <Card className="w-full h-full p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              isClearable
              fullWidth
              label="Title"
              placeholder="Enter title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Textarea
              fullWidth
              label="Description"
              placeholder="Enter description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Select
              label="Status"
              placeholder="Select Status"
              fullWidth
              selectedKeys={[formData.status]}
              onSelectionChange={(value) => {
                setFormData({ ...formData, status: value.currentKey });
              }}
            >
              <SelectSection>
                {["pending", "in_progress", "completed", "archived"].map(
                  (state) => (
                    <SelectItem key={state}>{state}</SelectItem>
                  )
                )}
              </SelectSection>
            </Select>
            <Spacer y={1} />
            <DatePicker
              label="Due Date"
              variant="bordered"
              name="dueDate"
              fullWidth
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              onChange={(value) => {
                const isoDate = moment(value, "YYYYMMDD").toISOString();
                setFormData({ ...formData, dueDate: isoDate });
              }}
            />
            <Spacer y={1} />
            <Select
              label="Prority"
              placeholder="Select prority"
              fullWidth
              selectedKeys={[formData.priority]}
              onSelectionChange={(value) => {
                setFormData({ ...formData, priority: value.currentKey });
              }}
            >
              <SelectSection>
                {["low", "medium", "high"].map((state) => (
                  <SelectItem key={state}>{state}</SelectItem>
                ))}
              </SelectSection>
            </Select>
            <Spacer y={1} />
            <Button
              isDisabled={isLoading}
              fullWidth
              color="primary"
              variant="solid"
              size="lg"
              type="submit"
            >
              {isLoading ? "submitting..." : id ? "Update Todo" : "Create Todo"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
