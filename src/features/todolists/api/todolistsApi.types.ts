import { z } from "zod/v4"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedAt: z.iso.datetime(),
  order: z.int(),
})

export type Todolist = z.infer<typeof todolistSchema>
export type TodolistAttributes = Omit<Todolist, "id">
