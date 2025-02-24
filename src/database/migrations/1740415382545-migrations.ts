import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740415382545 implements MigrationInterface {
    name = 'Migrations1740415382545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article_category" ("id" BIGSERIAL NOT NULL, "name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cdd234ef147c8552a8abd42bd29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "username" character varying, "email" character varying, "phone" character varying, "password" character varying, "role" character varying, "resetPasswordToken" text, "emailVerifiedAt" TIMESTAMP, "fcmToken" text, "avatar" text, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" BIGSERIAL NOT NULL, "title" character varying, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" bigint, "categoryId" bigint, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_comment" ("id" BIGSERIAL NOT NULL, "comment" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" bigint, "articleId" bigint, CONSTRAINT "PK_35f34db03db8f2c304a3bd1216d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES "article_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_comment" ADD CONSTRAINT "FK_d501e7c60f674a1d44b30fcaba8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_comment" ADD CONSTRAINT "FK_4d5ab30629a42bad659fe1d4da6" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_comment" DROP CONSTRAINT "FK_4d5ab30629a42bad659fe1d4da6"`);
        await queryRunner.query(`ALTER TABLE "article_comment" DROP CONSTRAINT "FK_d501e7c60f674a1d44b30fcaba8"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_12824e4598ee46a0992d99ba553"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_636f17dadfea1ffb4a412296a28"`);
        await queryRunner.query(`DROP TABLE "article_comment"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article_category"`);
    }

}
