import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "src/helpers/decorator.helper";
import { User } from "src/module/user/entities/user.entity";

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        return this.matchRoles(roles, user.role);
    }

    matchRoles(roles: string[], role: string) {
        return roles.includes(role);
    }
}