import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type ScreenProps = NativeStackScreenProps<{}>



export interface QueryResult<T> {
    resultCount: number;
    results: T[];
}

export interface Artist {
    wrapperType: "artist";
    artistType: "Artist";
    artistName: string;
    artistLinkUrl: string;
    artistId: number;
    primaryGenreName: string;
    primaryGenreId: number;
}

export interface Song {
    trackId: number;
    wrapperType: "track";
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    trackViewUrl: string;
}

export interface LikedSong {
    song: Song;
    rating: number;
}