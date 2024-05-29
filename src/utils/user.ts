import { PublicUser } from "./api/dto/user";
import { User } from "./auth";

export function publicUser(user: User | undefined): PublicUser {
  return {
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    color: user?.color || "",
    picture: user?.picture || null
  };
}
