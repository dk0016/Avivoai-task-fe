import type {
  DialogProps,
  UserDataProps,
  UserListProps,
} from "@/common/interface";
import { Button, CloseButton, Dialog, Icon, Portal } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

export const CustomDialog = ({
  dialogTitle,
  dialogDescription,
  setUserData,
  id,
  setIsLoading,
}: DialogProps) => {
  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  const deleteUser = () => {
    if (setIsLoading) setIsLoading(true);
    setUserData((prev: UserDataProps) => {
      const updatedUsers = prev.users.filter(
        (user: UserListProps) => user.id !== id
      );
      return {
        ...prev,
        users: updatedUsers,
        total: prev.total - 1,
      };
    });
    if (setIsLoading) setIsLoading(false);
    closeRef.current?.click();
  };

  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild ref={closeRef}>
        <Icon as={AiFillDelete} w={6} h={6} color="red.500" cursor="pointer" />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{dialogDescription}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button bgColor={"red.500"} onClick={deleteUser}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
