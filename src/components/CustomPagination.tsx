import { Button, Flex, Text } from "@chakra-ui/react";

interface CustomPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}
export const CustomPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: CustomPaginationProps) => {
  return (
    <Flex justify="space-between" align="center" mt={4}>
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      <Text>
        {currentPage} of {totalPages}
      </Text>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </Flex>
  );
};
