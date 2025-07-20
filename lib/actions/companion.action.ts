"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseclient } from "@/lib/Supabase";

// Optional: type definition
type GetAllCompanions = {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
};

// Helper to normalize subject/topic
function normalizeParam(param?: string | string[]): string | undefined {
  if (!param) return undefined;
  if (Array.isArray(param)) return param[0]?.trim() || undefined;
  return param.trim();
}

export const createcompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = supabaseclient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(`Error creating companion: ${error.message}`);
  }

  return data;
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = supabaseclient();
  let query = supabase.from("companions").select();

  const cleanSubject = normalizeParam(subject);
  const cleanTopic = normalizeParam(topic);

  if (cleanSubject && cleanTopic) {
    query = query
      .ilike("subject", `%${cleanSubject}%`)
      .or(`topic.ilike.%${cleanTopic}%,name.ilike.%${cleanTopic}%`);
  } else if (cleanSubject) {
    query = query.ilike("subject", `%${cleanSubject}%`);
  } else if (cleanTopic) {
    query = query.or(
      `topic.ilike.%${cleanTopic}%,name.ilike.%${cleanTopic}%`
    );
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);
  return companions;
};
