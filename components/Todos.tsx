"use client";

import { getTodos } from "@/server/actions";
import { todos } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";

type Todo = typeof todos.$inferInsert;

const Todos = () => {
  const {
    data: { result: todos } = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) return "Loading...";
  if (error) return <div>{error.message}</div>;
  if (!todos) return "No todos";

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li>{todo.title}</li>
      ))}
    </ul>
  );
};

export default Todos;
