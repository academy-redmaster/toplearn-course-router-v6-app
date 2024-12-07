import axios from "axios";
import { useState, useEffect } from "react";
import CustomLoader from "../components/customLoader";
import CantactCard from "../components/contactCard";
import { Button } from "@nextui-org/button";
import routerLightImage from "../assets/image/react-routr-light.svg";
import routerDarkImage from "../assets/image/react-router-dark.svg";
import { useTheme } from "next-themes";

export default function ContactUsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
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
    <div className="min-h-[80vh] max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-8 py-10">
      <div className="flex flex-col items-center justify-center gap-y-6 *:text-center">
        <h1 className="text-2xl font-semibold">
          React Router Workshop: From Library to Framework, All in One
          Comprehensive Training
        </h1>
        <p className="">
          Master every feature and capability of React Router—dive deep into its
          evolution from a powerful library to a full-fledged framework, all in
          one workshop.
        </p>
        <div className="hidden md:flex items-center justify-center gap-6">
          <Button isIconOnly variant="light">
            <i className="ri-reactjs-line text-4xl"></i>
          </Button>
          <Button isIconOnly color="danger" variant="light">
            <i className="ri-add-line text-4xl"></i>
          </Button>

          {theme === "dark" ? (
            <img
            className="w-52 h-52 object-contain"
            src={routerDarkImage}
            alt=""
          />
          ) : (
            <img
            className="w-52 h-52 object-contain"
            src={routerLightImage}
            alt=""
          />
          )}
          <Button isIconOnly color="danger" variant="light">
            <i className="ri-equal-line text-4xl"></i>
          </Button>
          <p className="text-xl font-bold">FullStack App</p>
        </div>
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
