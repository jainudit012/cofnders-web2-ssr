export class User {
    _id?:string
    id?: string
    firstName?: string
    lastName?: string
    email?: string
    emailVerified?: boolean
    profilePicture?: string
    fullName?: string
    sub?: string
    purpose?: string
    brief?: string
    isAdmin?: boolean
    isFormFilled?: boolean
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
    projects?: number
    opportunities?: number
    applications?: number
}