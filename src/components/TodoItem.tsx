import React from 'react';
import { Check, Trash2, Square } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 group">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`p-1 rounded-md transition-colors ${
            todo.completed ? 'text-green-500' : 'text-gray-400'
          } hover:bg-gray-100`}
        >
          {todo.completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
        </button>
        <span
          className={`text-gray-700 ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}