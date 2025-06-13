export interface UserListProps {
  id: number;
  firstName: string;
  lastName: string;
  company: { name: string };
  phone: string;
  email: string;
  address: { country: string };
}

export interface UserDataProps {
  limit: number;
  skip: number;
  total: number;
  users: UserListProps[];
}

export interface DialogProps {
  dialogTitle: string;
  dialogDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserData: (src: any) => void;
  id: number;
  setIsLoading?: (loading: boolean) => void;
}
