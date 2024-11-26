import axios from "axios";
import { useState, useEffect } from "react";
import CustomLoader from "../components/customLoader";
import CantactCard from "../components/contactCard";

export default function ContactUsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:8008/api/users");
        setUsers(result.data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [users.id]);
  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto pt-0 md:pt-8 flex flex-col items-center justify-center gap-y-8 py-10 ">
      <div className="flex flex-col items-center justify-center gap-y-4 *:text-center">
        <h1 className="text-2xl font-semibold">
          with just on call, step into our amazing world!
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
          totam in voluptatibus esse voluptatum sint, quaerat, quos eos saepe
          dolorem quia laboriosam numquam eligendi id beatae iure officia
          voluptas vero!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full place-items-center">
        {loading ? (
          <div className="col-span-3">
            <CustomLoader />
          </div>
        ) : (
          users.map((items) => (
            <CantactCard key={items.id} cardDetails={items} />
          ))
        )}
      </div>
    </div>
  );
}
