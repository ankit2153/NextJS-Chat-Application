import Sidebar from "../sidebar/Sidebar";

import ConversationList from "../ConversationList";
import getConversations from "../../../(actions)/getConversations";

import getUsers from "../../../(actions)/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}