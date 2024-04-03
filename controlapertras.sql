-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2024 a las 17:41:54
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
  `Fecha_finalizar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `Nom_tienda` varchar(30) NOT NULL,
  `N_tienda` int(30) NOT NULL,
  `Fecha_prueba` date NOT NULL,
  `Fecha_apertura` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `Nom_tienda`, `N_tienda`, `Fecha_prueba`, `Fecha_apertura`) VALUES
(63, 'SUPERCITO LOPEZ MATEOS ATIZAPA', 811, '2022-12-13', '2022-12-08'),
(64, 'SUPERCITO XALAPA REVOLUCION', 812, '2023-06-16', '2023-08-19'),
(68, 'SUPERCITO XALAPA REVOLUCION', 202, '2022-05-14', '2022-06-12'),
(69, 'SUPERCITO VERACRUZ DOS CAMINOS', 203, '2023-09-10', '2023-11-02'),
(70, 'SUPERCITO VERACRUZ CLAVIJERO', 204, '2022-03-25', '2022-06-14');

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
(3, 'Jaime ', 'Hernandez', 'Jhdzq@chedraui.com', 1890, '', 'Venta', '543212345');

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
  MODIFY `Id_agregar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
