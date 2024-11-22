'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Loader2, Trash2 } from 'lucide-react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '@/lib/api/queries';
import LayoutSidebar from '@/components/layout-sidebar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const todoSchema = z.object({
  label: z.string().min(1, 'Label is required'),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export default function TodosPage() {
  const t = useTranslations();
  const [showAll, setShowAll] = React.useState(true);
  const { data: todos, isLoading } = useTodos({ done: showAll ? undefined : false });
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      label: '',
    },
  });

  const onSubmit = async (data: TodoFormValues) => {
    try {
      await createTodoMutation.mutateAsync({
        label: data.label,
        done: false,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id: number, done: boolean) => {
    try {
      await updateTodoMutation.mutateAsync({
        id,
        todo: { done },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutSidebar>
      <div className="container max-w-2xl py-8 mx-auto">
        <Card className="border-none shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t('todos.title')}</CardTitle>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-all"
                checked={showAll}
                onCheckedChange={() => setShowAll(!showAll)}
              />
              <label htmlFor="show-all" className="text-sm text-muted-foreground cursor-pointer">
                {t('todos.showAll')}
              </label>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder={t('todos.newTodoPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={createTodoMutation.isPending} className="px-6">
                  {createTodoMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {t('actions.add')}
                </Button>
              </form>
            </Form>

            <div className="space-y-3">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : todos?.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">{t('todos.noTodos')}</p>
              ) : (
                todos?.map(todo => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between gap-3 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/10"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        className="h-5 w-5"
                        checked={todo.done || false}
                        onCheckedChange={checked => toggleTodo(todo.id, checked as boolean)}
                      />
                      <span
                        className={`text-base ${
                          todo.done ? 'text-muted-foreground line-through' : ''
                        }`}
                      >
                        {todo.label}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      disabled={deleteTodoMutation.isPending}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutSidebar>
  );
}
