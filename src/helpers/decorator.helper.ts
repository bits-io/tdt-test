import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { User } from 'src/module/user/entities/user.entity';
import { EntityManager } from 'typeorm'


export const UserSession = createParamDecorator<User | null>(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export const Roles = Reflector.createDecorator<string[]>();

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [tableName, column] = args?.constraints as string[]

    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists()

    return !dataExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property

    return `${field} is already exist.`
  }
}
