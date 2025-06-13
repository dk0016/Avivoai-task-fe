import { Card, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface BackgroundCardProps {
  child: ReactNode;
}
export const BackgroundCard = ({ child }: BackgroundCardProps) => {
  return (
    <div className="main-container">
      <Stack gap="4" direction="row" wrap="wrap">
        <Card.Root width="70vw" variant={"elevated"}>
          <Card.Body gap="2">{child}</Card.Body>
        </Card.Root>
      </Stack>
    </div>
  );
};
