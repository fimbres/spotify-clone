import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if(sessionError) {
        console.error("something went wrong! ", sessionError.message);
    }
    
    const { data, error } = await supabase.from('liked_songs').select('*, songs(*)').eq('user_id', sessionData.session?.user.id).order('created_at', {
        ascending: false
    });

    if(error) {
        console.error(error);
    }

    return data?.map(item => ({
        ...item.songs
    })) as Song[];
};
