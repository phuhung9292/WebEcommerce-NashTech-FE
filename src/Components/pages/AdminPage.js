import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, Outlet } from "react-router-dom";
function AdminPage() {
  const [show, setShow] = useState(1);
  return (
    <div>
      <div className="flex justify-center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Link to={"product-manage"}>
            <Button>Product</Button>
          </Link>
          <Link to={"management-user"}>
            <Button>Users</Button>
          </Link>
          <Link to={"manage-orders"}>
            <Button>Order</Button>
          </Link>
        </ButtonGroup>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPage;
