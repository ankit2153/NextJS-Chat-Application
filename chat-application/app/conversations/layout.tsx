import Sidebar from "../(site)/(components)/sidebar/Sidebar";

import ConversationList from "../(site)/(components)/ConversationList";
import getConversations from "../(actions)/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversatios = await getConversations();

  return (
    <Sidebar>
      <ConversationList initialItems={conversatios} />

      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
