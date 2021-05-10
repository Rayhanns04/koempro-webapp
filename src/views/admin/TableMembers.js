import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name",
  },
  {
    dataField: "price",
    text: "Product Price",
  },
];

const TableMembers = () => {
  return <BootstrapTable keyField="id" data={products} columns={columns} />;
};

export default TableMembers;
