"use server";

import { db } from "./db";
import { todos } from "./db/schema";

type Todo = typeof todos.$inferInsert;

export async function createTodo(todo: Todo) {
  try {
    const data = await db.insert(todos).values(todo);
    return { data };
  } catch (error) {
    return { error: error };
  }
}

export async function getTodos() {
  try {
    const result: Todo[] = await db.select().from(todos);
    return { result };
  } catch (error) {
    return { error: error };
  }
}

export async function getDummy() {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`).then(
      (res) => res.json()
    );
    return res;
  } catch (error) {
    return { error: error };
  }
}
