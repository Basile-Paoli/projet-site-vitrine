export interface Session {
    id: number;
    theme: string;
    duree: number;
    prix: number;
    nbParticipantsMin: number;
    creneaux: string[];
}
