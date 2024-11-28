import { Outlet } from "react-router-dom";

export default function TodoLayoutPage() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
