import { MenuItem } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { ReactNode } from "react";

interface PostMenuItemProps {
  href: string;
  children: ReactNode;
  data?: object;
}

export default function PostMenuItem({
  href,
  children,
  data,
}: PostMenuItemProps) {
  const { post } = useForm();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    post(href, data);
  };

  return <MenuItem onClick={handleClick}>{children}</MenuItem>;
}
