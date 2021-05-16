import {MigrationInterface, QueryRunner} from "typeorm";

export class MI041608747198621 implements MigrationInterface {
    name = 'MI041608747198621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `instance` `instance` varchar(25) NULL COMMENT 'identificador de la instancia del cliente'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `second_name` `second_name` varchar(20) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `maiden_name` `maiden_name` varchar(20) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `phone` `phone` varchar(10) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `photo` `photo` longtext NULL", undefined);
        await queryRunner.query("ALTER TABLE `permissions` CHANGE `parent_id` `parent_id` int NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `permissions` CHANGE `parent_id` `parent_id` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `photo` `photo` longtext NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `phone` `phone` varchar(10) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `maiden_name` `maiden_name` varchar(20) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `second_name` `second_name` varchar(20) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `instance` `instance` varchar(25) NULL COMMENT 'identificador de la instancia del cliente' DEFAULT 'NULL'", undefined);
    }

}
