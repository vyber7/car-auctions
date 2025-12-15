const AccountHeader = ({ userName }: { userName: string | undefined }) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <h1 className="mt-16 py-20 w-full text-center text-7xl bg-white rounded-md shadow-md shadow-gray-400 col-span-4">
      Hello, {capitalize(userName as string)}!
    </h1>
  );
};

export default AccountHeader;
