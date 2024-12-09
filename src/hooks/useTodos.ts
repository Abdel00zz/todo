import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Todo } from '../types/todo';

const API_URL = '/.netlify/functions/todos';

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      return response.json();
    },
  });

  const addTodo = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleTodo = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to toggle todo');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    addTodo: addTodo.mutate,
    toggleTodo: toggleTodo.mutate,
    deleteTodo: deleteTodo.mutate,
    isLoading: addTodo.isPending || toggleTodo.isPending || deleteTodo.isPending,
  };
}