import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Navbar from "@/Components/Navbar";

export default function Dashboard({ auth }: PageProps) {
  return (
    <Navbar user={auth.user}>
      <Head title="Dashboard" />

      <p>You are logged in!</p>
    </Navbar>
  );
}
