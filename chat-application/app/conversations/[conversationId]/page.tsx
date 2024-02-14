interface IParams {
  conversationId: string;
}

import getConverbyId from "@/app/(actions)/getConverbyId";

import getMessages from "@/app/(actions)/getMessages";
import Header from "@/app/(site)/(components)/Header";

import EmptyState from "@/app/(site)/(components)/EmptyState";

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConverbyId(params.conversationId);

  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80 ">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  );
};

export default ConversationId;
