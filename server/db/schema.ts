import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todoFlagEnum = pgEnum("todo_flag_enum", ["normal", "urgent"]);

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  flag: todoFlagEnum("flag").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
