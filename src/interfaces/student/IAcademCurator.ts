export interface IAcademCuratorResponse {
    id: number,
    name: string,
    cathedra: ICathedra;
    curator: IAcademCurator;
}

export interface IAcademCurator {
    id: number;
    fullName: string;
    photo: string;
    profile: string;
    userIdentifier: string;
    credo: string;
}

export interface ICathedra {
    id: number;
    name: string;
}