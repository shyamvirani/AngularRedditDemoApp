export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: Date;
    username: string;
    createdDate:Date;
    userId:number;
}
