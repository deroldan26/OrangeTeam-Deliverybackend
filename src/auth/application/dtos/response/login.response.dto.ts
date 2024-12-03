import { GetUserServiceResponseDto } from "src/user/application/dtos/response/get-user-response.service.dto";

export interface LoginResponseDto {
    user: GetUserServiceResponseDto
    token: string
}