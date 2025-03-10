import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { NavLink, useLocation } from "react-router-dom";

export default function BreadCrumbCustom() {
  const location = useLocation();
  const pahtnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs>
      <BreadcrumbItem key="home">
        <NavLink to="/">Home</NavLink>
      </BreadcrumbItem>
      {pahtnames?.map((items, index) => {
        const pathTo = `/${pahtnames.slice(0, index + 1).join("/")}`;
        return (
          <BreadcrumbItem key={index}>
            <NavLink end to={pathTo}>
              {items}
            </NavLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
