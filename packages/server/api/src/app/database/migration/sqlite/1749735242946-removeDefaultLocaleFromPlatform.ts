import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveDefaultLocaleFromPlatform1749735242946 implements MigrationInterface {
    name = 'RemoveDefaultLocaleFromPlatform1749735242946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_platform" (
                "id" varchar(21) PRIMARY KEY NOT NULL,
                "created" datetime NOT NULL DEFAULT (datetime('now')),
                "updated" datetime NOT NULL DEFAULT (datetime('now')),
                "ownerId" varchar(21) NOT NULL,
                "name" varchar NOT NULL,
                "primaryColor" varchar NOT NULL,
                "logoIconUrl" varchar NOT NULL,
                "fullLogoUrl" varchar NOT NULL,
                "favIconUrl" varchar NOT NULL,
                "cloudAuthEnabled" boolean NOT NULL DEFAULT (1),
                "filteredPieceNames" text NOT NULL,
                "filteredPieceBehavior" varchar CHECK(
                    "filteredPieceBehavior" IN ('ALLOWED', 'BLOCKED')
                ) NOT NULL,
                "allowedAuthDomains" text NOT NULL,
                "enforceAllowedAuthDomains" boolean NOT NULL,
                "emailAuthEnabled" boolean NOT NULL,
                "federatedAuthProviders" text NOT NULL,
                "smtp" text,
                "pinnedPieces" text NOT NULL,
                "copilotSettings" text,
                CONSTRAINT "REL_94d6fd6494f0322c6f0e099141" UNIQUE ("ownerId"),
                CONSTRAINT "fk_platform_user" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
            )
        `)
        await queryRunner.query(`
            INSERT INTO "temporary_platform"(
                    "id",
                    "created",
                    "updated",
                    "ownerId",
                    "name",
                    "primaryColor",
                    "logoIconUrl",
                    "fullLogoUrl",
                    "favIconUrl",
                    "cloudAuthEnabled",
                    "filteredPieceNames",
                    "filteredPieceBehavior",
                    "allowedAuthDomains",
                    "enforceAllowedAuthDomains",
                    "emailAuthEnabled",
                    "federatedAuthProviders",
                    "smtp",
                    "pinnedPieces",
                    "copilotSettings"
                )
            SELECT "id",
                "created",
                "updated",
                "ownerId",
                "name",
                "primaryColor",
                "logoIconUrl",
                "fullLogoUrl",
                "favIconUrl",
                "cloudAuthEnabled",
                "filteredPieceNames",
                "filteredPieceBehavior",
                "allowedAuthDomains",
                "enforceAllowedAuthDomains",
                "emailAuthEnabled",
                "federatedAuthProviders",
                "smtp",
                "pinnedPieces",
                "copilotSettings"
            FROM "platform"
        `)
        await queryRunner.query(`
            DROP TABLE "platform"
        `)
        await queryRunner.query(`
            ALTER TABLE "temporary_platform"
                RENAME TO "platform"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "platform"
                RENAME TO "temporary_platform"
        `)
        await queryRunner.query(`
            CREATE TABLE "platform" (
                "id" varchar(21) PRIMARY KEY NOT NULL,
                "created" datetime NOT NULL DEFAULT (datetime('now')),
                "updated" datetime NOT NULL DEFAULT (datetime('now')),
                "ownerId" varchar(21) NOT NULL,
                "name" varchar NOT NULL,
                "primaryColor" varchar NOT NULL,
                "logoIconUrl" varchar NOT NULL,
                "fullLogoUrl" varchar NOT NULL,
                "favIconUrl" varchar NOT NULL,
                "cloudAuthEnabled" boolean NOT NULL DEFAULT (1),
                "filteredPieceNames" text NOT NULL,
                "filteredPieceBehavior" varchar CHECK(
                    "filteredPieceBehavior" IN ('ALLOWED', 'BLOCKED')
                ) NOT NULL,
                "defaultLocale" varchar CHECK(
                    "defaultLocale" IN (
                        'nl',
                        'en',
                        'de',
                        'it',
                        'fr',
                        'bg',
                        'uk',
                        'hu',
                        'es',
                        'ja',
                        'id',
                        'vi',
                        'zh',
                        'pt'
                    )
                ),
                "allowedAuthDomains" text NOT NULL,
                "enforceAllowedAuthDomains" boolean NOT NULL,
                "emailAuthEnabled" boolean NOT NULL,
                "federatedAuthProviders" text NOT NULL,
                "smtp" text,
                "pinnedPieces" text NOT NULL,
                "copilotSettings" text,
                CONSTRAINT "REL_94d6fd6494f0322c6f0e099141" UNIQUE ("ownerId"),
                CONSTRAINT "fk_platform_user" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
            )
        `)
        await queryRunner.query(`
            INSERT INTO "platform"(
                    "id",
                    "created",
                    "updated",
                    "ownerId",
                    "name",
                    "primaryColor",
                    "logoIconUrl",
                    "fullLogoUrl",
                    "favIconUrl",
                    "cloudAuthEnabled",
                    "filteredPieceNames",
                    "filteredPieceBehavior",
                    "allowedAuthDomains",
                    "enforceAllowedAuthDomains",
                    "emailAuthEnabled",
                    "federatedAuthProviders",
                    "smtp",
                    "pinnedPieces",
                    "copilotSettings"
                )
            SELECT "id",
                "created",
                "updated",
                "ownerId",
                "name",
                "primaryColor",
                "logoIconUrl",
                "fullLogoUrl",
                "favIconUrl",
                "cloudAuthEnabled",
                "filteredPieceNames",
                "filteredPieceBehavior",
                "allowedAuthDomains",
                "enforceAllowedAuthDomains",
                "emailAuthEnabled",
                "federatedAuthProviders",
                "smtp",
                "pinnedPieces",
                "copilotSettings"
            FROM "temporary_platform"
        `)
        await queryRunner.query(`
            DROP TABLE "temporary_platform"
        `)
    }

}
