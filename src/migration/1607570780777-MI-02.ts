import {MigrationInterface, QueryRunner} from "typeorm";

export class MI021607570780777 implements MigrationInterface {
    name = 'MI021607570780777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `second_name` `second_name` varchar(20) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `maiden_name` `maiden_name` varchar(20) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `phone` `phone` varchar(10) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `photo` `photo` longtext NULL", undefined);
        await queryRunner.query("ALTER TABLE `permissions` CHANGE `parent_id` `parent_id` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `instance` `instance` varchar(25) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `instance` `instance` varchar(25) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `permissions` CHANGE `parent_id` `parent_id` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `photo` `photo` longtext NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `phone` `phone` varchar(10) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `maiden_name` `maiden_name` varchar(20) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `second_name` `second_name` varchar(20) NULL DEFAULT 'NULL'", undefined);
    }

}
