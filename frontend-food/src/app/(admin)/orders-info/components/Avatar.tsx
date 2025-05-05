import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export const Avatar = () => {
  return (
    <div className="flex justify-between items-center">
      <UIAvatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </UIAvatar>
    </div>
  );
};
