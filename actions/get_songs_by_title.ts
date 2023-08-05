import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSongs } from "./get_songs";

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
 
    if(!title) {
        const allSongs = await getSongs();
        return allSongs;
    }
    
    const { data, error } = await supabase.from('songs').select('*').eq('title', `%${title}%`).order('created_at', {
        ascending: false
    });

    if(error) {
        console.error(error);
    }

    return (data || []) as Song[];
};
