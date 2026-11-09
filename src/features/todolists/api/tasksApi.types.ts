import { TaskPriority, TaskStatus } from "@/common/enums"
import type { ApiResource, BaseResponse } from "@/common/types"
import { z } from "zod/v4"

export const domainTaskSchema = z.object({
  id: z.string(),
  todolistId: z.string(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.iso.datetime().nullable(),
  deadline: z.iso.datetime().nullable(),
  order: z.int(),
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type DomainTask = z.infer<typeof domainTaskSchema>
export type TaskAttributes = Omit<DomainTask, "id" | "todolistId">

export type GetTasksResponse = BaseResponse<ApiResource<TaskAttributes>[]> & {
  meta: { totalCount: number }
}

export type TasksData = {
  items: DomainTask[]
  totalCount: number
}

export type UpdateTaskModel = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string | null
  deadline?: string | null
}
