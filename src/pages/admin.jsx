import { Button } from "@heroui/react";
import { Link, Outlet, useParams, useRoutes } from "react-router-dom";

export default function AdminPage() {
  const { "*": spalate } = useParams();
  console.log("🚀 ~ AdminPage ~ params:", spalate);
  const pathnames = spalate.split("/");
  console.log("🚀 ~ AdminPage ~ pathnames:", pathnames);

  // useRoutes
  const routes = useRoutes([
    {
      path: "/",
      element: <h1>Home page</h1>,
    },
    {
      path: "blog",
      element: (
        <div>
          <h1>welcome to blog page</h1>
          <Outlet />
        </div>
      ),
      children: [
        {
          index:true,
          element: <Button>Layout</Button>,
        },
        {
          path: ":id",
          element: <h1>welcome to blog page id ******</h1>,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <h1>welcome to AdminPage {JSON.stringify(pathnames)}</h1>
      <div className="space-x-6">
        <Link to=".">Home</Link>
        <Link to="./blog">Blog</Link>
      </div>
      {routes}
    </div>
  );
}
