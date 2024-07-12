import React, { HTMLAttributes } from "react";
import { foregroundFor } from "@/utils/luminance";
import { PublicUser } from "@/utils/api/dto/user";
import { cn } from "@/utils";
import { PersonIcon } from "@/components/icons";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: PublicUser | null;
  showName?: boolean;
  showEmail?: boolean;
  small?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  className,
  style,
  showName = false,
  showEmail = false,
  small = false,
  ...props
}) => {
  const initials = () => {
    if (user) {
      const [firstName, lastName] = user.name.split(" ");
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

    return "";
  };

  const foregroundClass = user ? foregroundFor(user.color) : "text-white";
  const Wrapper = showName || showEmail ? "div" : React.Fragment;

  return (
    <Wrapper className="flex gap-3 items-center">
      <div
        className={cn(
          "rounded-full flex justify-center items-center overflow-hidden",
          { "w-7 h-7": small },
          { "w-9 h-9": !small },
          className
        )}
        style={{
          backgroundColor: user?.color || "#dedede",
          ...style
        }}
        {...props}
      >
        {user?.picture ? (
          <img width={48} height={48} src={user.picture} alt={user.name} />
        ) : (
          <span
            className={cn(foregroundClass, "font-semibold", {
              "text-sm": small
            })}
          >
            {!user ? (
              <PersonIcon
                className={cn("w-6 h-6 stroke-black", { "w-5 h-5": small })}
              />
            ) : (
              initials()
            )}
          </span>
        )}
      </div>
      {user && (showName || showEmail) && (
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
