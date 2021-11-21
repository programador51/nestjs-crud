-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2021 a las 04:43:40
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";START TRANSACTION;
SET
    time_zone = "+00:00";
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8mb4 */;--
    -- Base de datos: `todofime`
    --
    DELIMITER $ $ --
    -- Procedimientos
    --
    CREATE PROCEDURE `v1_DeleteTask` (IN `apiTicketId` INT) BEGIN
UPDATE
    tasks
SET
    logicalErase = 1
WHERE
    id = apiTicketId;END $ $ CREATE PROCEDURE `v1_GetTasks` (IN `apiBegin` INT, IN `apiNextOnes` INT) BEGIN
SELECT
    Tasks.id AS id,
    Tasks.description AS description,
    Tasks.createdDate AS createdDate,
    Tasks.completed AS completed,
    Tasks.userId AS userId,
    IF(Tasks.completed = 1, 'Completado', 'Por hacer') AS status
FROM
    Tasks
WHERE
    Tasks.userId = 1
    AND Tasks.logicalErase = 0
ORDER BY
    Tasks.createdDate DESC
LIMIT
    apiBegin, apiNextOnes;
SELECT
    @totalPages AS totalPages;END $ $ CREATE PROCEDURE `v1_GetTasksPaginated` (IN `apiPage` INT, IN `apiLimitRows` INT) BEGIN CALL v1_GetTasksPagination(apiPage, apiLimitRows);CALL v1_GetTasks(@startRow, @rowsPerPage);END $ $ CREATE PROCEDURE `v1_GetTasksPagination` (IN `apiPage` INT, IN `apiNoRows` INT) NO SQL BEGIN
SET
    @rows = (
        SELECT
            COUNT(*) AS noTasks
        FROM
            tasks
        WHERE
            userId = 1
            AND logicalErase = 0
    );
SET
    @rowsPerPage = (
        SELECT
            apiNoRows
    );
SET
    @startRow = (
        SELECT
            ((apiPage - 1) * @rowsPerPage)
    );
SET
    @totalPages = (
        SELECT
            CEIL(@rows / @rowsPerPage)
    );END $ $ CREATE PROCEDURE `v1_UpdateTask` (
        IN `apiTaskId` INT,
        IN `apiTaskContent` VARCHAR(256)
    ) BEGIN
UPDATE
    tasks
SET
    description = apiTaskContent
WHERE
    id = apiTaskId;END $ $ CREATE PROCEDURE `v1_UpdateTaskStatus` (IN `apiStatus` INT, IN `apiIdTask` INT) BEGIN
UPDATE
    tasks
SET
    completed = apiStatus
WHERE
    id = apiIdTask;END $ $ DELIMITER;-- --------------------------------------------------------
    --
    -- Estructura de tabla para la tabla `tasks`
    --
    CREATE TABLE `tasks` (
        `id` int(11) NOT NULL,
        `description` varchar(256) NOT NULL,
        `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
        `completed` tinyint(4) NOT NULL,
        `logicalErase` tinyint(4) NOT NULL,
        `userId` int(11) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;--
    -- Volcado de datos para la tabla `tasks`
    --
INSERT INTO
    `tasks` (
        `id`,
        `description`,
        `createdDate`,
        `completed`,
        `logicalErase`,
        `userId`
    )
VALUES
    (
        75,
        'Crear servidor',
        '2021-10-23 00:18:46',
        1,
        0,
        1
    ),
    (76, 'ccc', '2021-10-23 00:18:50', 1, 1, 1),
    (77, 'Crear bd', '2021-10-23 00:18:53', 1, 0, 1),
    (78, 'Crear UI', '2021-10-23 00:19:00', 1, 0, 1),
    (
        79,
        'Agregar logica a UI',
        '2021-10-23 00:20:01',
        1,
        0,
        1
    ),
    (
        80,
        'Aprobar la materia :(',
        '2021-10-23 00:20:22',
        0,
        0,
        1
    ),
    (
        81,
        'Seleccione una fila ;)',
        '2021-10-23 00:20:57',
        0,
        0,
        1
    ),
    (
        82,
        'Create a blog',
        '2021-11-15 19:12:38',
        0,
        0,
        1
    ),
    (
        83,
        'Facturama feature',
        '2021-11-15 19:14:05',
        0,
        0,
        1
    ),
    (
        84,
        'Buy a new monitor to work',
        '2021-11-15 19:14:16',
        1,
        0,
        1
    ),
    (
        85,
        'Aqui actualize mi tarea',
        '2021-11-15 19:34:18',
        0,
        0,
        1
    ),
    (
        86,
        'Finish with nestjs',
        '2021-11-18 20:59:34',
        0,
        0,
        1
    ),
    (
        87,
        'Hello world',
        '2021-11-18 20:59:47',
        1,
        1,
        1
    );--
    -- Índices para tablas volcadas
    --
    --
    -- Indices de la tabla `tasks`
    --
ALTER TABLE
    `tasks`
ADD
    PRIMARY KEY (`id`);--
    -- AUTO_INCREMENT de las tablas volcadas
    --
    --
    -- AUTO_INCREMENT de la tabla `tasks`
    --
ALTER TABLE
    `tasks`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 88;COMMIT;
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;