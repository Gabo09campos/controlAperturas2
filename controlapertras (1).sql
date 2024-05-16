-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2024 a las 21:00:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controlapertras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `Nombre` varchar(35) NOT NULL,
  `Apellidos` varchar(40) NOT NULL,
  `Correo_electrónico` varchar(40) NOT NULL,
  `N_empleados` int(10) NOT NULL,
  `Contraseña` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasosconsecutivos`
--

CREATE TABLE `pasosconsecutivos` (
  `Id_agregar` int(11) NOT NULL,
  `Nom_apertura` varchar(30) NOT NULL,
  `Departamento_responsble` varchar(30) NOT NULL,
  `Usuario` varchar(45) NOT NULL,
  `Num_paso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pasosconsecutivos`
--

INSERT INTO `pasosconsecutivos` (`Id_agregar`, `Nom_apertura`, `Departamento_responsble`, `Usuario`, `Num_paso`) VALUES
(61, 'Alta de controladores', 'Direccion TI', 'Gabriel', 1),
(62, 'Alta de prmociones', 'Ventas', 'Pedro', 2),
(63, 'Alta de precios', 'Ventas', 'Juan', 4),
(64, 'Envio de bines', 'Direccion TI', 'Miguel Angel', 5),
(65, 'Envio de promociones', 'Ventas', 'Juan', 6),
(66, 'Ala auditoria', 'Direccion TI', 'Gabriel', 7),
(67, 'Alta autorizadores bancarios', 'Ventas', 'Pedro', 8),
(68, 'Alta Q-promo', 'Ventas', 'Juan', 9),
(69, 'Alta ticket digital', 'Direccion TI', 'Miguel Angel', 10),
(70, 'Alta produtos', 'Ventas', 'Pedro', 12),
(71, 'Pruebas integrales', 'Direccion TI', 'Gabriel', 13),
(72, 'Apertura', 'Direccion TI', 'Miguel Angel', 14),
(133, 'prueba de paso 2', 'Direccion TI', 'Gabriel', 9),
(134, 'prueba de paso 3', 'Direccion TI', 'Gabriel', 11),
(135, 'prueba de paso 4', 'Direccion TI', 'Gabriel', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `Nom_tienda` varchar(30) NOT NULL,
  `N_tienda` int(30) NOT NULL,
  `Fecha_prueba` date NOT NULL,
  `Fecha_apertura` date NOT NULL,
  `Pasos_finalizados` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `Nom_tienda`, `N_tienda`, `Fecha_prueba`, `Fecha_apertura`, `Pasos_finalizados`) VALUES
(71, 'SUPERCITO COL DOCTORES CUAUHTE', 206, '2022-06-30', '2022-08-12', '[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(72, 'SUPERCITO XALAPA REVOLUCION', 207, '2023-09-13', '2023-10-16', '[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]'),
(73, 'SUPERCITO COL DOCTORES CUAUHTE', 209, '2023-02-14', '2023-05-21', '[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(74, 'SUPERCITO XALAPA CLAVIJERO', 211, '2024-04-09', '2024-05-09', '[1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(75, 'SUPERCITO XALAPA REVOLUCION', 212, '2023-02-14', '2023-04-19', '[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(76, 'SUPERCITO COL DOCTORES CUAUHTE', 213, '2023-05-02', '2023-06-23', '[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(78, 'SUPERCITO XALAPA CLAVIJERO', 214, '2023-07-13', '2023-08-25', '[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(79, 'SUPERCITO XALAPA DOS CAMINOS', 215, '2023-06-14', '2023-07-19', '[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(91, 'SUPERCITO LOPEZ MATEOS ATIZAPA', 225, '2024-04-11', '2024-05-03', '[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(92, 'SUPERCITO COL DOCTORES CUAUHTE', 227, '2024-04-02', '2024-05-01', '[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(105, 'SUPERCITO VERACRUZ DOS CAMINOS', 228, '2024-05-14', '2024-06-03', '[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(106, 'SUPERCITO LOPEZ MATEOS ATIZAPA', 229, '2024-04-19', '2024-05-15', '[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(107, 'SUPERCITO VERACRUZ CLAVIJERO', 230, '2024-05-08', '2024-05-30', '[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),
(109, 'SUPERCITO XALAPA REVOLUCION', 231, '2022-07-13', '2022-08-25', '[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellidos` varchar(40) NOT NULL,
  `Correo_electrónico` varchar(40) NOT NULL,
  `N_empleados` int(10) NOT NULL,
  `T_usuario` varchar(30) NOT NULL,
  `Departamento` varchar(30) NOT NULL,
  `Contrasena` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Apellidos`, `Correo_electrónico`, `N_empleados`, `T_usuario`, `Departamento`, `Contrasena`) VALUES
(1, 'Miguel Angel', 'Perez', 'MangelP@chedraui.com', 1023, 'Administrador', 'Direccion TI', '123456789'),
(2, 'Gabriel', 'Campos', 'Gabo@chedraui.com', 1045, 'Usuario', 'Direccion TI', '987654321'),
(6, 'Juan', 'Marquez', 'Jmaz@chedraui.com', 1027, 'Usuario', 'Direccion TI', '12345676543'),
(7, 'Pedro', 'Martinez', 'PeMa@chedraui.com', 1028, 'Usuario', 'Ventas', '9876513245');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pasosconsecutivos`
--
ALTER TABLE `pasosconsecutivos`
  ADD PRIMARY KEY (`Id_agregar`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pasosconsecutivos`
--
ALTER TABLE `pasosconsecutivos`
  MODIFY `Id_agregar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
