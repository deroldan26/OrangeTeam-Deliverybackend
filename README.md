<p align="center">
  <img src="documentation/godelylogo.jpg" width="120" alt="GoDely Logo" />
</p>

<h1 align="center">🚚Bienvenido al repositorio de GoDely App - Backend🚚</h1>

Backend de la aplicación de delivery GoDely realizado en Nestjs.

## 📐Arquitectura de la aplicación📏

- **Arquitectura Hexagonal**: La arquitectura hexagonal, a la que también se le conoce como arquitectura de puertos y adaptadores, es una arquitectura de software que se basa en la idea de aislar la lógica comercial central de las preocupaciones externas, por medio de la separación de la aplicación en componentes débilmente acoplados.
- **Diseño Orientado al Dominio (DDD)**: DDD es una aproximación holística al diseño de software que pone en el centro el Domain; es decir, el dominio o problema de negocio. DDD define el Ubiquitous Language como la jerga que los expertos de negocio emplean de manera natural para articular y para definir su problema de negocio.
- **Programación Orientada a Aspectos (AOP)**: AOP es un paradigma de programación que basa su filosofía en tratar las obligaciones transversales de nuestros programas como módulos separados (aspectos) para lograr una correcta separación de responsabilidades. Una obligación transversal es aquella que se repite en varias partes de un programa independientemente de si las secciones en las que aparece tienen relación directa.

## 🛠Tecnologías usadas🛠

[![Tecnologias](https://skillicons.dev/icons?i=postgres,nestjs,gmail,rabbitmq)](https://skillicons.dev)

## 📋Documentación de la aplicación📋

- [Modelo de dominio de la aplicación](documentation/Modelo_Dominio-OrangeTeamBackend.pdf)
- [Modelo Hexagonal de la aplicación](documentation/Diagrama_Hexagonal-OrangeTeamBackend.pdf)

## 🚧Instalación del proyecto🚧

Installation of dependencies

```bash
$ npm install
```

Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 💻Aportes de los desarrolladores💻

**David Roldán**
- **Capa de dominio:** Creación de la todas las clases e interfaces base de los patrones tácticos de DDD, además de diseñar e implementar los agregados de producto y orden.
- **Capa de aplicación:** Creación de la todas las clases e interfaces base para los servicios de aplicación y DTOs, además de diseñar e implementar los servicios en producto y orden.
- **Capa de infraestructura:** Creación de la todas las clases e interfaces base para los controladores de infraestructura, incluyendo entidades ORM, repositorios, controladores, DTOs y mappers, además del diseño e implementación de los servicios de infraestructura para producto y orden. Adicionalmente, se diseño e implementó microservicios para la gestión de eventos de dominio usando RabbitMQ y envio de correos.

**Romel González**
- **Capa de dominio:** Implementacíon de los patrones tácticos de DDD para los modulos de cupón, categoría y parcialmente de combo.
- **Capa de aplicación:** Implementación de los aspectos de Logueo, auditoria, desempeño y excepciones. Además se implementaron los servicios de aplicación para los modulos de cupón, usuario, categoría y parcialmente de combo.
- **Capa de infraestructura:** Implementación del módulo de autenticación usando JWT, implementación de Cloudinary para el almacenamiento de contenido audiovisual y diseño e implementación de los test unitarios usando Jest. Adicionalmente, se implementaron los servicios de infraestructura para los modulos de cupón, usuario, categoría y parcialmente de combo.

**Cristhian Mendes**
- **Capa de dominio:** Implementacíon de los patrones tácticos de DDD para los modulos de descuento y parcialmente de combo.
- **Capa de aplicación:** Diseño e implementación de servicios de aplicación para la validacion de data en los modulos de Categoría, producto y descuento, además de la implementación de los servicios de aplicación para los modulos de descuento y parcialmente de combo.
- **Capa de infraestructura:** Implementación de los servicios de infraestructura para los módulos de descuento y parcialmente de combo.

## 👨🏽‍🎓Autores👨🏽‍💼

<table align="center">
  <tr>
    <td align="center">
      <img src="images/DavidRoldan.jpg" width="100" alt="David Roldán" />
      <br>
      <a href="https://github.com/deroldan26"><strong>David Roldán</strong></a>
    </td>
    <td align="center">
      <img src="images/CristhianMendes.jpg" width="100" alt="Developer 2" />
      <br>
      <a href="https://github.com/Cris27M"><strong>Cristhian Mendes</strong></a>
    </td>
    <td align="center">
      <img src="images/RomelGonzales.jpg" width="100" alt="Developer 3" />
      <br>
      <a href="https://github.com/romelgonzalez1"><strong>Romel González</strong></a>
    </td>
  </tr>
</table>
