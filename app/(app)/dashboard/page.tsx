import Container from "@/app/components/Container";
import Heading from "@/app/(app)/components/Heading";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function generateMetadata() {
  const currentUser = await getCurrentUser();

  return {
    title: `Dashboard | ${currentUser?.name || ""}`,
    description: currentUser?.email || "",
  };
}

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <Heading title="Dashboard" subtitle="Welcome to your dashboard" />
    </Container>
  );
};

export default DashboardPage;
