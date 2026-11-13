CREATE DATABASE `1O1dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

CREATE DATABASE `1O1dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `resource_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `comment_content` text NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `likes` (
  `resource_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `likes_unique` (`resource_id`,
`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `medium` (
  `resource_id` int(10) unsigned NOT NULL,
  `medium_id` int(10) unsigned NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `resources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `description` text NOT NULL,
  `link` text NOT NULL,
  `approved` binary(1) NOT NULL DEFAULT x'30',
  `free` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `create` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `resource_unique` (`link`)
    USING HASH
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `saved_resources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `resource_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `folder_id` int(10) unsigned NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `bio` mediumtext DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `warnings` (
  `resource_id` int(10) unsigned NOT NULL,
  `warning_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `warnings_unique` (`resource_id`,
`warning_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `likes_comments` (
  `comment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `parent` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_unique` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;

CREATE TABLE `1O1dev`.taggings (
	tag_id int(10) unsigned NOT NULL,
	resource_id int(10) unsigned NOT NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `1O1dev`.taggings;


/*
like_resource_id
*/