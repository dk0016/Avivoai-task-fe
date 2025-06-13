import { Table } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface CustomDataTableProps {
  headerData: string[];
  child: ReactNode;
}
export const CustomDataTable = ({
  headerData,
  child,
}: CustomDataTableProps) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="400px">
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            {headerData?.length &&
              headerData.map((coloumn: string, index: number) => (
                <Table.ColumnHeader key={index}>{coloumn}</Table.ColumnHeader>
              ))}
          </Table.Row>
        </Table.Header>
        {child}
      </Table.Root>
    </Table.ScrollArea>
  );
};
