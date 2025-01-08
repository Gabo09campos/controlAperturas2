-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2025 a las 05:46:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id_departamento` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id_departamento`, `Nombre`) VALUES
(1, 'Direccion TI'),
(2, 'Ventas'),
(3, 'Inmobiliaria'),
(4, 'RR.HH.'),
(5, 'Cobranza');

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
(198, 'Alta de controladores', 'Direccion TI', 'Juan', 1),
(199, 'Alta de promociones', 'Ventas', 'Enrique', 2),
(200, 'Alta de precios', 'Ventas', 'Fernando', 4),
(201, 'Envio de bines', 'Cobranza', 'Juan', 6),
(202, 'Envio de precios', 'Ventas', 'Fernando', 7),
(203, 'Ala auditoria', 'Cobranza', 'Enrique', 8),
(204, 'Alta autorizadores bancarios', 'Cobranza', 'Fernando', 9),
(205, 'Alta Q-promo', 'Inmobiliaria', 'Pedro', 10),
(206, 'Alta ticket digital', 'Direccion TI', 'Miguel Angel', 11),
(207, 'Alta produtos', 'Inmobiliaria', 'Enrique', 12),
(208, 'Pruebas integrales', 'Direccion TI', 'Gabriel', 13),
(209, 'Apertura', 'Inmobiliaria', 'Fernando', 14),
(210, 'prueba de paso 1', 'Direccion TI', 'Gabriel', 3),
(211, 'prueba de paso 2', 'Ventas', 'Pedro', 5),
(212, 'apertura final345', 'Inmobiliaria', 'gtyu67', 15);

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
(118, 'SUPERCITO VERACRUZ CLAVIJERO', 910, '2024-04-30', '2024-05-16', '[1,1,1,1,1,0,0,0,0,0,0,0,0,0]'),
(121, 'SUPERCITO LOPEZ MATEOS ATIZAPA', 891, '2024-01-10', '2024-02-14', '[]'),
(122, 'SUPERCITO VERACRUZ DOS CAMINOS', 219, '2024-03-12', '2024-04-15', '[]'),
(123, 'SUPERCITO XALAPA REVOLUCION', 893, '2024-06-04', '2024-07-09', '[]'),
(124, 'SUPERCITO XALAPA CLAVIJERO', 315, '2024-05-09', '2024-08-23', '[]'),
(125, 'supercito xalapa ver', 613, '2025-01-14', '2025-09-14', '[]');

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
  `Contrasena` varchar(300) NOT NULL,
  `Permiso` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Apellidos`, `Correo_electrónico`, `N_empleados`, `T_usuario`, `Departamento`, `Contrasena`, `Permiso`) VALUES
(1, 'Miguel Angel', 'Perez', 'MangelP@chedraui.com', 1023, 'Administrador', 'Direccion TI', 'T3ZvZElZRVNxUWF4eDAvTWpUbFhDUT09', 1),
(2, 'Gabriel', 'Campos', 'Gabo@chedraui.com', 1045, 'Usuario', 'Direccion TI', '987654321', 0),
(6, 'Juan', 'Marquez', 'Jmaz@chedraui.com', 1027, 'Usuario', 'Direccion TI', '12345676543', 0),
(7, 'Pedro', 'Martinez', 'PeMa@chedraui.com', 1028, 'Usuario', 'Ventas', '9876513245', 1),
(9, 'Fernando', 'Hernandez', 'Fher@chedraui.com', 1429, 'Usuario', 'Cobranza', 'a0U5SWRqUmJNT0Jnd21OKy8rMmFTUT09', 0),
(11, 'Mari', 'Landa', 'MLanda@chdraui.com', 1032, 'Usuario', 'Ventas', '1jgvuyf67rfvhvj', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id_departamento`);

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
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pasosconsecutivos`
--
ALTER TABLE `pasosconsecutivos`
  MODIFY `Id_agregar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
