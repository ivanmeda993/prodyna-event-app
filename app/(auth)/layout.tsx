const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="h-full bg-neutral-200">{children}</div>;
};

export default ConversationsLayout;
