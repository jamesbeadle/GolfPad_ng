export type UpdateGolferDTO = {
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    handicap: number | null,
    homeCourseId: number | null,
    profilePicture: File | null
}