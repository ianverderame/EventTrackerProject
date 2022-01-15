-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gorundb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gorundb` ;

-- -----------------------------------------------------
-- Schema gorundb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gorundb` DEFAULT CHARACTER SET utf8 ;
USE `gorundb` ;

-- -----------------------------------------------------
-- Table `route`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `route` ;

CREATE TABLE IF NOT EXISTS `route` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `state` TEXT NULL,
  `length` DOUBLE NULL,
  `picture_url` VARCHAR(500) NULL,
  `enabled` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `run`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `run` ;

CREATE TABLE IF NOT EXISTS `run` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NULL,
  `weather` VARCHAR(450) NULL,
  `date` DATE NULL,
  `heart_rate` INT NULL,
  `time` DOUBLE NULL,
  `completed` TINYINT NULL,
  `picture_url` VARCHAR(500) NULL,
  `route_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_run_route_idx` (`route_id` ASC),
  CONSTRAINT `fk_run_route`
    FOREIGN KEY (`route_id`)
    REFERENCES `route` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS runner@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'runner'@'localhost' IDENTIFIED BY 'runner';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'runner'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `route`
-- -----------------------------------------------------
START TRANSACTION;
USE `gorundb`;
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (1, 'Lincoln Park', 'Denver', 'Colorado', 1, 'https://upload.wikimedia.org/wikipedia/commons/6/63/Lincolnparkdenver.jpg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (2, 'Platte River', 'Denver', 'Colorado', 4, 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Sprco2.jpg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (3, 'Mile High Mile', 'Denver', 'Colorado', 1, 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Denver_skyline.jpg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (4, 'Colfax Marathon', 'Denver', 'Colorado', 26.2, 'https://en.wikipedia.org/wiki/Colfax_Marathon#/media/File:Colorado_Colfax_Marathon_banner,_Lakewood.jpg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (5, 'Colfax Half Marathon', 'Denver', 'Colorado', 13.1, 'https://en.wikipedia.org/wiki/Colfax_Marathon#/media/File:Colorado_Colfax_Marathon_banner,_Lakewood.jpg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (6, 'Boston Marathon', 'Boston', 'Massachusetts', 26.2, 'https://upload.wikimedia.org/wikipedia/en/7/7a/Boston_Marathon_logo.svg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (7, 'New York City Marathon', 'New York City', 'New York', 26.2, 'https://upload.wikimedia.org/wikipedia/en/2/2d/TCS_New_York_City_Marathon_Logo.svg', 1);
INSERT INTO `route` (`id`, `name`, `city`, `state`, `length`, `picture_url`, `enabled`) VALUES (8, 'Barkley Marathons', 'Wartburg', 'Tennessee', 100, 'https://i.ytimg.com/vi/79IUKC9gS-8/maxresdefault.jpg', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `run`
-- -----------------------------------------------------
START TRANSACTION;
USE `gorundb`;
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (1, 4, 'Sunny', '2022-01-01', 165, 7, 1, 'https://previews.123rf.com/images/belchonock/belchonock1909/belchonock190913083/130341006-young-man-running-in-park-on-sunny-day.jpg?fj=1', 1);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (2, 4, 'Cloudy', '2021-12-30', 169, 32.51, 1, 'https://www.rajibroy.com/wp-content/uploads/2017/12/3FBF4DC9-0E8E-4706-BB99-8296D9017151.jpeg', 2);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (3, 3, 'Overcast', '2021-12-28', 167, 7.56, 1, 'https://images.wallpapersden.com/image/download/manhattan-cloudy-skyscraper_a2dtbmaUmZqaraWkpJRobWllrWdma2U.jpg', 1);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (4, 1, 'Windy', '2021-5-19', 170, 240, 1, 'https://www.runcolfax.org/wp-content/uploads/2017_CFax-8774-1_470x264_acf_cropped.jpg', 4);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (5, 2, 'Sunny', '2021-6-29', 168, 228, 1, 'https://theknow-old.denverpost.com/wp-content/uploads/2019/05/COLFAX-MARATHON-KS-051920191458.jpg', 4);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (6, 5, 'Partly Cloudy', '2019-5-19', 164, 118, 1, 'https://www.runcolfax.org/wp-content/uploads/cr-DSC_4287-1024x731.jpg', 5);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (7, 1, 'Rainy', '2018-4-16', 173, 204, 1, 'https://en.wikipedia.org/wiki/2018_Boston_Marathon#/media/File:Boston_Marathon_2018_lead_women.jpg', 6);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (8, 4, 'Sunny', '2019-4-17', 160, 198, 1, 'https://cdn.britannica.com/19/223119-050-DE27A6F1/Runners-Boylston-Street-Boston-Marathon-April-18-2016.jpg', 6);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (9, 3, 'Sunny', '2021-6-06', 164, 210, 1, 'https://cdn.vox-cdn.com/thumbor/dekbOrGG3cXDqY6Rp2HTBiKStg4=/0x0:5727x3818/1200x800/filters:focal(2406x1451:3322x2367)/cdn.vox-cdn.com/uploads/chorus_image/image/65554612/GettyImages_1057313484.0.jpg', 7);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (10, 5, 'Cloudy', '2019-6-07', 166, 212, 1, 'https://image.cnbcfm.com/api/v1/image/104824127-IMG_3303.jpg', 7);
INSERT INTO `run` (`id`, `rating`, `weather`, `date`, `heart_rate`, `time`, `completed`, `picture_url`, `route_id`) VALUES (11, 1, 'Rainy', '2019-04-02', 153, 2400, 0, 'https://i.insider.com/5b6dfbe2e199f336008b4fcc?width=1136&format=jpeg', 8);

COMMIT;

