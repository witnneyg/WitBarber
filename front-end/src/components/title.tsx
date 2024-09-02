interface TitleProps {
  name: string;
  className?: string;
}

export function Title({ name, className }: TitleProps) {
  return (
    <h2
      className={`uppercase text-gray-400 font-bold text-xs mt-6 mb-3 ${className} `}
    >
      {name}
    </h2>
  );
}
