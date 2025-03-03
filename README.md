# Todo-LIST

Todo-list en php avec enregistrement des taches dans un base de donne mysql

## Table des matières

- [Aperçu](#aperçu)
- [Demo](#Demo)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Contribuer](#contribuer)

## Aperçu
creation de nouvelle tache
![Capture du syteme](/demo/todo.png)

## Demo
[Voir la vidéo de démonstration](https://media-hosting.imagekit.io//b8e8f58cf45c4d03/demo.mp4?Expires=1835622043&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ShAy0SZ8Wi~NMCVA80b6En~8r368JSaFNG168rD63QheP217vFClhGRNuGDDkzD--mnaMPLhg1aC62PULvtK~~MrNRMFMcR8DcDqLXfEdPvIBUnguuHdxpAo4aSIN23gchx7JJfG5aQLZpuN11U~knU484wQODXOAuWwQBkNVVTkDN6pH1PEqCgfb6TXn5x~Nuo5LqsOQKIw~IlmK7T47C4WxY7OCb98UUFkXPHa9p8av7GFV~KtDSFW1MTozwRVjj4UWFWXX7QI5-2uoMqaXOrbmo9LeDqLPPdTKtOBeXvqLtqgqGiKs-OFo0QeJwYd2W8e0pfDOyT0QX7TsBKN3A__)

## Fonctionnalités

- ajout, supression, edition des taches
- trier entre les taches accompli et ceux non accompli

## Installation
### Installation de mysql et php separement

- Installer php sur le site officiel [telechargement php](https://www.php.net/downloads.php)
- Telecharger et installer mySQL [telechargement mysql](https://dev.mysql.com/downloads/windows/)
- executer cet commande pour creer un base de donnee du nom de 'gi_user' dans le terminal:
  ```
  mysql
  CREATE DATABASE todo;
  ```
- ensuite creer une table 'user'
  ```
  USE gi_user;
  CREATE TABLE tasks(
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMEN PRIMARY KEY,
      date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
      task TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
  );
  ```
- cloner ce depot et executer cette commamde dans le project pour demarer le server php:
  `
  php -S localhost:8000
  `
### Utilisateur d'un environnement de developpent local(Xampp)

- Telecharger et installer xampp [telechargement de xampp](https://www.apachefriends.org/fr/download.html)
- cloner ce depot dans le dossier htdocs de xampp souvent sous
`C:\xampp\htdocs\`
- lancer la panneau de control xampp:
![xampp control panel icon](/demo/control_icon.png)
- lancer les module Apache et mySQL:
![xampp module](/demo/xampp_control_panel.png)
- aller a l'adresse `localhost` ou `127.0.0.1` dans votre navigateur
- dans la barre de recherche effacer dashboard/ et remplacer par le nom du clone du depot

## Contribuer

Les contributions à ce projet sont les bienvenues ! N'hésitez pas à soumettre des problèmes, suggestions ou améliorations via GitHub.
