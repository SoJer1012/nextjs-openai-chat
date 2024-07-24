interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
// 基础按钮
export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="test-xs px-4 py-2 bg-zinc-950 text-white rounded-md"
      {...rest}
    >
      {children}
    </button>
  );
}

