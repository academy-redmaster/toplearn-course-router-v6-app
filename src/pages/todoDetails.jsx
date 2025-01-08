import axios from "axios";
import { useEffect, useState } from "react";
import {
  useHref,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import CustomLoader from "../components/customLoader";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar, Button, Chip } from "@nextui-org/react";
import moment from "moment";
import { toast } from "react-toastify";

export default function TodoDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  const href = useHref("blog");
  console.log("🚀 ~ TodoDetailsPage ~ href:", href);

  const resolved = useResolvedPath("#comment");
  console.log("🚀 ~ TodoDetailsPage ~ resolved:", resolved);

  // get data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8008/api/todos/${id}`
        );
        setTodo(response.data);
      } catch (error) {
        toast.error(`${error.message}: id=${id} not Found`);
        navigate("/todo", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <CustomLoader />;
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <Card className="w-full lg:w-1/2 mx-auto h-[400px]">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="lg"
              src={todo?.owner?.profilePhoto}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {todo.title}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {todo?.owner?.email}
              </h5>
            </div>
          </div>
          <div className="space-x-2">
            <Button
              color="secondary"
              radius="full"
              size="sm"
              variant={"shadow"}
            >
              {todo?.isArchived ? "Arichived" : "UnArchived"}
            </Button>
            <Button color="warning" radius="full" size="sm" variant={"shadow"}>
              {todo.status}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3  text-small text-default-400 flex flex-col justify-between py-4">
          <p>{todo.description}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-x-3">
              <Chip color="danger" variant="shadow">
                Due Date:
              </Chip>
              <span>{moment(todo.duedate).format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="flex items-center gap-x-3">
              <Chip color="danger" variant="shadow">
                daysLeft:
              </Chip>
              <span>{todo.daysLeft}</span>
            </div>
            {todo.completedAt ? (
              <div className="flex items-center gap-x-3">
                <Chip color="danger" variant="shadow">
                  CompletedAt
                </Chip>
                <span>
                  {moment(todo.compeletedAt).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>
            ) : null}
          </div>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              username
            </p>
            <p className=" text-default-400 text-small">
              {todo?.owner?.userName}
            </p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">email</p>
            <p className="text-default-400 text-small">{todo?.owner?.email}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
