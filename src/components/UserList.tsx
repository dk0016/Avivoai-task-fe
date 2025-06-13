import { Icon, Table, Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { BackgroundCard } from "./Card";
import { CustomDataTable } from "./CustomDataTable";
import { MdRefresh } from "react-icons/md";
import React from "react";
import axios from "axios";
import { CustomDialog } from "./CustomDialog";
import { CustomPagination } from "./CustomPagination";
import type { UserDataProps, UserListProps } from "@/common/interface";
import { UserAddPopup } from "./UserAddPopup";

const headerData = [
  "Name",
  "Company Name",
  "Phone",
  "Email",
  "Country",
  "Action",
];

export const UserList = () => {
  const [userData, setUserData] = React.useState<UserDataProps>({
    limit: 10,
    skip: 0,
    total: 0,
    users: [],
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    const limit = 10;
    const skip = (page - 1) * limit;
    await axios
      .get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((res) => {
        setUserData({
          limit: res.data.limit,
          skip: res.data.skip,
          total: res.data.total,
          users: res.data.users,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(userData.total / userData.limit);

  const filteredUsers = React.useMemo(() => {
    return userData.users.filter((item) =>
      `${item.firstName} ${item.lastName} ${item.email} ${item.phone} ${item.company.name} ${item.address.country}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [userData.users, searchTerm]);

  return (
    <BackgroundCard
      child={
        <>
          {/* Search + Buttons */}
          <Flex justify="space-between" align="center" mb={4}>
            <Input
              placeholder="Search by name or email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
            <Flex gap={2}>
              <Button onClick={() => fetchData(currentPage)}>
                <Icon as={MdRefresh} mr={1} />
                Refresh
              </Button>
              <UserAddPopup
                dialogTitle={"Add User"}
                setUserData={setUserData}
              />
            </Flex>
          </Flex>

          <>
            {/* Table */}
            <CustomDataTable
              headerData={headerData}
              child={
                <Table.Body>
                  {isLoading ? (
                    <Table.Row>
                      <Table.Cell
                        colSpan={headerData.length || 0}
                        textAlign="center"
                        height="300px"
                        border="none"
                      >
                        <Spinner size="xl" color="blue.500" />
                      </Table.Cell>
                    </Table.Row>
                  ) : filteredUsers.length ? (
                    filteredUsers.map((item: UserListProps) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>
                        <Table.Cell>{item.company.name || "-"}</Table.Cell>
                        <Table.Cell>{item.phone || "-"}</Table.Cell>
                        <Table.Cell>{item.email || "-"}</Table.Cell>
                        <Table.Cell>{item.address.country || "-"}</Table.Cell>
                        <Table.Cell>
                          <CustomDialog
                            dialogTitle={"Confirmation"}
                            dialogDescription={`Are you sure you want to delete the user ${item.firstName} ${item.lastName}`}
                            setUserData={setUserData}
                            id={item.id}
                            setIsLoading={setIsLoading}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell
                        colSpan={headerData.length || 0}
                        textAlign="center"
                        height="300px"
                        border="none"
                      >
                        No data available
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              }
            />

            {/* Pagination */}
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        </>
      }
    />
  );
};
