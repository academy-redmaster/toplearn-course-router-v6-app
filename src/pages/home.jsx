import { useTheme } from "next-themes";
import routerLightImage from "../assets/image/react-routr-light.svg";
import routerDarkImage from "../assets/image/react-router-dark.svg";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { theme } = useTheme();
  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto w-full flex flex-col gap-y-12 items-center justify-center">
      <div className="flex flex-col items-center justify-between gap-y-6">
        <h1 className="font-semibold text-lg">Welcome to Course TopLearn.com</h1>
      </div>
      {theme === "dark" ? (
        <img src={routerDarkImage} className="w-full px-8 lg:px-0" alt="" />
      ) : (
        <img src={routerLightImage} className="w-full px-8 lg:px-0" alt="" />
      )}

      <div className="flex items-center gap-x-6">
        <Button as={Link} to="https://github.com/academy-redmaster/toplearn-course-router-v6-app" size="lg" color="primary" variant="shadow">
          Access to Source Code
        </Button>
        <Button as={Link} to="https://reactrouter.com/en/6.28.0" size="lg" color="danger" variant="shadow">
          React Router Reference
        </Button>
        <Button as={Link} to="http://localhost:8008/api-docs/" size="lg" color="warning" variant="shadow">
          REST API Document
        </Button>
      </div>
    </div>
  );
}
