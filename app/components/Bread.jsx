import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import React from "react";

const Bread = () => {
  return (
    <div className="ml-5 mt-2">
      <Breadcrumbs>
        <BreadcrumbItem>AI</BreadcrumbItem>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Bread;
