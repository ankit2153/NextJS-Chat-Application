import Sidebar from "../(site)/(components)/sidebar/Sidebar";

import getUsers from "../(actions)/getUsers";
import Userlist from "../(site)/(components)/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <Userlist items={users} />
        {children}</div>
    </Sidebar>
  );
}
