import Todos from "@/components/Todos";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { getTodos } from "@/server/actions";
import { UserButton, auth } from "@clerk/nextjs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  const isAuth: boolean = !!userId;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      Landing page
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
      {isAuth ? (
        <>
          Welcome!
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Todos />
          </HydrationBoundary>
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </>
      )}
    </main>
  );
}
