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

export enum Purpose {
    FOUNDER = 'Founder',
    INVESTOR = 'Investor',
    MENTOR = 'Mentor'
}

export enum UserType {
    Investor = 'Investor',
    Mentor = 'Mentor', 
    Consulting_Firm='Consulting Firm', 
    IT_Services='IT Services', 
    Investment_Advisor='Investment Advisor', 
    Startup_Founder='Startup Founder'
}