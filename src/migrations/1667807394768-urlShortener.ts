import { MigrationInterface, QueryRunner } from 'typeorm';

export class urlShortener1667807394768 implements MigrationInterface {
  name = 'urlShortener1667807394768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "url_shortener" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "origin" character varying NOT NULL, "shorten" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f66b6909dc295d013695cdc1c37" UNIQUE ("origin"), CONSTRAINT "UQ_482145446c77b48f65268c33efe" UNIQUE ("shorten"), CONSTRAINT "PK_05db59c80e8cac1f161182e22c1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "url_shortener"`);
  }
}
