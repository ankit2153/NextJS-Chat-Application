import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/(libs)/prismadb";

interface IParams {
  conversationId?: string;
}

const deleteConversation = async (conversationId: string) => {
  try {
    // Fetch the conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: true,
      },
    });

    // Check if conversation exists
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Delete associated messages
    const messageIds = conversation.messages.map((message) => message.id);
    await prisma.message.deleteMany({
      where: {
        id: {
          in: messageIds,
        },
      },
    });

    // Now that messages are deleted, delete the conversation
    await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });

    console.log("Conversation and associated messages deleted successfully");
  } catch (error) {
    console.error("Error deleting conversation:", error);
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const { conversationId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // const deletedConversation = await prisma.conversation.deleteMany({
    //   where: {
    //     id: conversationId,
    //     usersIds: {
    //       hasSome: [currentUser.id],
    //     },
    //   },
    // });   // not working with  my current setup

    //instead we will delete the conversation and messages associated with it
    // and then delete the conversation from the database using the deleteConversation function

    await deleteConversation(conversationId!);

    return NextResponse.json("deleted", { status: 200 });
  } catch (error: any) {
    return new NextResponse("ERROR:" + error, { status: 500 });
  }
};
