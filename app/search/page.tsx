import { getSongsByTitle } from "@/actions/get_songs_by_title";
import Header from "@/components/Header";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="bg-transparent">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search songs
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs}/>
        </div>
    );
}

export default Search;
