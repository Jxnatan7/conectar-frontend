import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouterHandler() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      if (!["/login", "/signup"].includes(pathname)) {
        router.push("/login");
      }
      return;
    }

    if (["/login", "/signup"].includes(pathname)) {
      if (user.role === "MANAGER") {
        router.push("/users");
      } else {
        router.push("/profile");
      }
      return;
    }

    if (user.role === "USER" && pathname.startsWith("/users")) {
      router.push("/profile");
      return;
    }
  }, [user, pathname, router]);
  return null;
}
