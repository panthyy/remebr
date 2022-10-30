export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-primary hover:cursor-pointer hover:bg-primaryDark text-white w-fit p-2 px-10"
    >
      {children}
    </button>
  );
};
