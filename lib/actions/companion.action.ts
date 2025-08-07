"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseclient } from "@/lib/Supabase";
import { features } from "node:process";


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
    query = query.or(`topic.ilike.%${cleanTopic}%,name.ilike.%${cleanTopic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);
  return companions;
};
export const getCompanion = async (id: string) => {
  const supabase = supabaseclient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    console.log("Error fetching companion:", error.message);
  }

  return data;
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = supabaseclient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) throw new Error(error.message);
  return data;
};

// export const getRecentSessions = async (limit = 10) => {
//   const supabase = supabaseclient();
//   const { data, error } = await supabase
//     .from("session_history")
//     .select(`companions:companion_id (*)`)
//     .order("created_at", { ascending: false })
//     .limit(limit);
// if(error){
//   throw new Error(error?.message);
// }
// return data.map(({companions})=>companions);

// };


export const getRecentSessions = async (limit = 10): Promise<Companion[]> => {
  const supabase = supabaseclient();

  const { data, error } = await supabase
    .from("session_history")
    .select("companions:companion_id (*)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }
  console.log("Raw Supabase session data:", data);

  return data.map(({ companions }) => companions as Companion);
};





export const getUserSessions = async (userId:string,limit=10) => {
  const supabase = supabaseclient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id",userId)
    .order("created_at", { ascending: false })
    .limit(limit);
if(error){
  throw new Error(error?.message);
}
return data.flatMap(({ companions }) => companions);

};

// companion.action.ts
// import { supabaseclient } from "../utils/supabase"; // adjust path
// import { Companion } from "@/types";

export const getUserCompanion = async (userId: string): Promise<Companion[]> => {
  const supabase = supabaseclient();

  const { data, error } = await supabase
    .from("companions")
    .select("*") // make sure you're selecting everything needed
    .eq("author", userId);

  if (error) throw new Error(error.message);

  console.log("✅ Returned data from Supabase:", data); // Debug print

  // ✅ This MUST be a flat array
  return data as Companion[];
};

export const newCompanionPermission = async()=>{
  const {userId,has,orgId} = await auth();
  const supabase = supabaseclient();
  
console.log("orgId:", orgId); // This must NOT be null
console.log("has Elite:", has({ plan: "Elite" }));
  let limit = 0;
  if (has({ plan: 'elite' })) {
  console.log("User has Elite plan");
  return true;
} else if (has({ feature: "basic" })) {
  limit = 3;
  console.log("User has 3 companion limit");
} else if (has({ feature: "premium" })) {
  limit = 10;
  console.log("User has 10 companion limit");
} else {
  console.log("User has no valid feature or plan");
  return false;
}
  const{data,error} = await supabase
  .from('companions').select('id',{count:'exact'})
  .eq('author',userId)
  if(error){
    throw new Error(error.message);
  }
  const companioncount = data?.length;
  if(companioncount>=limit){
    return false;
  }else{
    return true;
  }
}