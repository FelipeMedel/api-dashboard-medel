import {MigrationInterface, QueryRunner} from "typeorm";

export class MI011604451544890 implements MigrationInterface {
    name = 'MI011604451544890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(20) NOT NULL, `second_name` varchar(20) NULL, `last_name` varchar(20) NOT NULL, `maiden_name` varchar(20) NULL, `email` varchar(50) NOT NULL, `phone` varchar(10) NULL, `photo` longtext NULL, `username` varchar(20) NOT NULL, `password` varchar(250) NOT NULL, `status` int NOT NULL, `rol_id` int NOT NULL, `created_on` datetime NOT NULL, `update_on` datetime NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(15) NOT NULL, `description` varchar(25) NOT NULL, `status` int NOT NULL, `created_on` datetime NOT NULL, `update_on` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `permissions` (`id` int NOT NULL AUTO_INCREMENT, `option_id` int NOT NULL, `parent_id` int NULL, `name_permit` varchar(50) NOT NULL, `description` varchar(100) NOT NULL, `status` int NOT NULL, `created_on` datetime NOT NULL, `update_on` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `rol_permissions` (`id` int NOT NULL AUTO_INCREMENT, `option_id` int NOT NULL, `rol_id` int NOT NULL, `create` int NOT NULL, `read` int NOT NULL, `update` int NOT NULL, `delete` int NOT NULL, `created_on` datetime NOT NULL, `update_on` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `rol_permissions`", undefined);
        await queryRunner.query("DROP TABLE `permissions`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
