import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const Select_db = ({ onDatabaseSet }) => {
  const [databases, setDatabases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/databases");
        const data = await res.json();
        setDatabases(data.databases);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Select
      className="w-[180px] my-3 text-small"
      size="xs"
      // defaultSelectedKeys={[databases[0]?.value]}
      placeholder="Database"
      area-label="Database"
      onSelectionChange={(e) => onDatabaseSet(e)}
    >
      {databases.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.value}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Select_db;
