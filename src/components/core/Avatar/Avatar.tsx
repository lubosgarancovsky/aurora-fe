import React, { HTMLAttributes } from "react";
import { foregroundFor } from "@/utils/luminance";
import { cn } from "@/utils";
import { PublicUser } from "@/utils/api/dto/user";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: PublicUser;
  showName?: boolean;
  showEmail?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  className,
  style,
  showName = false,
  showEmail = false,
  ...props
}) => {
  const initials = () => {
    const [firstName, lastName] = user.name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const Wrapper = showName || showEmail ? "div" : React.Fragment;

  return (
    <Wrapper className="flex gap-3 items-center">
      <div
        className={cn(
          "rounded-full w-9 h-9 flex justify-center items-center overflow-hidden",
          className
        )}
        style={{
          backgroundColor: user.color,
          ...style
        }}
        {...props}
      >
        {user.picture ? (
          <img width={48} height={48} src={user.picture} alt={user.name} />
        ) : (
          <span className={cn(foregroundFor(user.color), "font-semibold")}>
            {initials()}
          </span>
        )}
      </div>
      {(showName || showEmail) && (
        <div className="flex flex-col text-left">
          {showName && <span className="leading-none">{user.name}</span>}
          {showEmail && (
            <span className="text-foreground-dark text-sm leading-4">
              {user.email}
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
};
