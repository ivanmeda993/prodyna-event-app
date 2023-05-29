import getSession from "@/app/actions/getSession";
import prismadb from "@/app/libs/prismadb";

export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    return await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email as string,
        },
      },
    });
  } catch (e: any) {
    return [];
  }
}
