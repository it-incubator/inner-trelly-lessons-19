import { baseApi } from "@/app/baseApi"
import { instance } from "@/common/instance"
import type { ApiResource, BaseResponse } from "@/common/types"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import type { Todolist, TodolistAttributes } from "./todolistsApi.types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "boards/my",
      transformResponse: (res: BaseResponse<ApiResource<TodolistAttributes>[]>): DomainTodolist[] =>
        res.data.map(({ id, attributes }) => ({ id, ...attributes, filter: "all", entityStatus: "idle" })),
      providesTags: ["Todolist"],
    }),
    addTodolist: build.mutation<BaseResponse<ApiResource<TodolistAttributes>>, string>({
      query: (title) => ({
        url: "boards",
        method: "POST",
        body: { data: { type: "boards", attributes: { title } } },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<void, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: build.mutation<void, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `boards/${id}`,
        method: "PATCH",
        body: { data: { type: "boards", attributes: { title } } },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi

const toTodolist = ({ id, attributes }: ApiResource<TodolistAttributes>): Todolist => ({
  id,
  ...attributes,
})

export const _todolistsApi = {
  getTodolists() {
    return instance
      .get<BaseResponse<ApiResource<TodolistAttributes>[]>>("/boards/my")
      .then((res) => res.data.data.map(toTodolist))
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.patch(`/boards/${id}`, { data: { type: "boards", attributes: { title } } })
  },
  createTodolist(title: string) {
    return instance
      .post<BaseResponse<ApiResource<TodolistAttributes>>>("/boards", {
        data: { type: "boards", attributes: { title } },
      })
      .then((res) => toTodolist(res.data.data))
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
}
