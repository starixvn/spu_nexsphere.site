'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { UserAgent } from "@/src/models/userAgent";

const columns = [
  {
    key: "userAgentKey",
    label: "UserAgentKey",
  },
  {
    key: "userAgent",
    label: "UserAgent",
  },
  {
    key: "createdDate",
    label: "CreatedDate",
  },
];

export default function ClientPage(props: any) {
  const userAgents = props.userAgents as UserAgent[];
  return (
      <div>
        <h1>User Agent</h1>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={userAgents}>
            {(item) => (
              <TableRow key={item.userAgentKey}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
