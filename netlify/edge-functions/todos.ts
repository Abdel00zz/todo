import { Config, Context } from "@netlify/edge-functions";
import { Todo } from "../../src/types/todo";

let todos: Todo[] = [];

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  // GET all todos
  if (request.method === "GET") {
    return Response.json(todos);
  }

  // POST new todo
  if (request.method === "POST") {
    const { text } = await request.json();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return Response.json(newTodo);
  }

  // PATCH toggle todo
  if (request.method === "PATCH" && id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return new Response("Todo not found", { status: 404 });
    }
    todos[todoIndex].completed = !todos[todoIndex].completed;
    return Response.json(todos[todoIndex]);
  }

  // DELETE todo
  if (request.method === "DELETE" && id) {
    todos = todos.filter((todo) => todo.id !== id);
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
}

export const config: Config = {
  path: "/api/todos/*",
};