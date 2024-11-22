import supabaseClient from "@/lib/supabase-client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type Todo = Tables<"todos">;
export type TodoInsert = TablesInsert<"todos">;
export type TodoUpdate = TablesUpdate<"todos">;

export async function getTodos({ done }: { done?: boolean } = {}) {
    let query = supabaseClient
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

    if (done !== undefined) {
        query = query.eq("done", done);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function createTodo(todo: TodoInsert) {
    const { data, error } = await supabaseClient
        .from("todos")
        .insert(todo)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateTodo(id: number, todo: TodoUpdate) {
    const { data, error } = await supabaseClient
        .from("todos")
        .update(todo)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTodo(id: number) {
    const { error } = await supabaseClient
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
