import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { UserDataProps, UserListProps } from "@/common/interface";

type FormValues = {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  country: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  companyName: yup.string().required("Company name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
});

interface Props {
  dialogTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserData: (src: any) => void;
}

export const UserAddPopup = ({ dialogTitle, setUserData }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  const handleFormSubmit = (data: FormValues) => {
    const [firstName, ...rest] = data.name.trim().split(" ");
    const lastName = rest.join(" ");

    const newUser: UserListProps = {
      id: Date.now(),
      firstName,
      lastName,
      company: { name: data.companyName },
      phone: data.phone,
      email: data.email,
      address: { country: data.country },
    };

    setUserData((prev: UserDataProps) => ({
      ...prev,
      users: [newUser, ...prev.users],
      total: prev.total + 1,
    }));
    closeRef.current?.click();
    reset();
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild ref={closeRef}>
        <Button colorScheme="blue">Add User</Button>
      </Dialog.Trigger>
      <Portal>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{dialogTitle}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="4" align="flex-center" maxW="md">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input {...register("name")} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.companyName}>
                    <Field.Label>Company Name</Field.Label>
                    <Input {...register("companyName")} />
                    <Field.ErrorText>
                      {errors.companyName?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>Phone</Field.Label>
                    <Input {...register("phone")} />
                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.country}>
                    <Field.Label>Country</Field.Label>
                    <Input {...register("country")} />
                    <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button type="submit">Submit</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </form>
      </Portal>
    </Dialog.Root>
  );
};
