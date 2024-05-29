import React from "react";
import { PublicUser } from "@/utils/api/dto/user";
import { foregroundFor } from "@/utils/luminance";
import { cn } from "@/utils";

interface AvatarProps {
  user: PublicUser;
  showName?: boolean;
  showEmail?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  showName = false,
  showEmail = false
}) => {
  const initials = () => {
    const [firstName, lastName] = user.name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const Wrapper = showName || showEmail ? "div" : React.Fragment;

  return (
    <Wrapper className="flex gap-3 items-center">
      <div
        className="rounded-full w-9 h-9 flex justify-center items-center overflow-hidden"
        style={{
          backgroundColor: user.color
        }}
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
