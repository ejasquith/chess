# Chess

# Project Overview

Chess as a game has been around since the 6th century and attracts players of any age, gender, or background, due to its easy-to-understand rules and deep strategic complexity.  

The purpose of this project is to provide a simple, browser-based tool for two players to play a game against each other, with none of the usual pressures of playing online (eg. rating).  

The beauty of chess lies in the fact that it can be as easy or difficult as you want - two beginners throwing pieces around may get as much satisfaction or enjoyment as two Grandmasters at the very top level playing the most important game of their lives. This is what the project aims to achieve - anyone at any level can enjoy using the site.

# Table of Content

[to implement]

# Planning Stage

## Target Audience

- Adults and children who do not regularly play chess but want a way to pass some time;
- More involved chess players who want a break from competitive play;
- Players looking for an easy way to introduce friends or family to the game.

## User Stories

As a user, I want to:

- play chess in-browser with a friend or family member.
- be able to customise the experience in a way that suits me (eg. colour themes).
- see a list of moves played and be able to cycle through them.
- see an updating count of what pieces have been taken.
- see who won and lost the game and track score.
- learn the rules of chess before I play.

## Site Aims

- To provide a free way to play chess against a friend or family member without owning a physical board;
- To be simple and easy to navigate and play;
- To provide full functionality of game history;
- To explain the rules of chess to those who need it;
- To be fully accessible and have options to change the colour scheme of the website and board area;
- Provide a session score tracker;
- To be enjoyable to players of all levels.

## How This Will Be Achieved

- The game will be entirely browser-based, requiring no downloads, sign ups, or payment;
- The project will be a single-page application (SPA), with a togglable pop-up for rules explanations;
- The site will be able to programmatically change its colour scheme based on user input;
- The site will have an area to display the previous moves in the current game and arrow buttons to cycle through the moves;
- The site will store the amount of games in the session, and track which player played with which colour each game;
- The site will display the amount of session wins for each player.

# Design Stage

## Colour Palette

I decided to use a dark colour theme for this project, using blue-greys (#565566 and #333c46) for background elements and white text. The chess board itself will have different colour schemes to choose from, with the default being an icy blue to match the rest of the site.

![The colour palette of the site](docs/images/colour-palette.png)

## Fonts

The font I will be using is IBM Plex Sans, with IBM Plex Mono used for displaying the game PGN (portable game notation, how the history of the game will be displayed). IBM Plex Sans is a simple sans serif font with a slightly modern feel to it, which matches well with the dark colour scheme I've chosen. I'm using a monospace font for the PGN because it makes it easier to read and parse long strings of non-english text.

# Development Stage

## Game Logic

Being a chess client, the most important part of the project was the game logic. This included setting up a digital representation of the board, finding valid moves for each different type of piece, and determing game end conditions like checkmate, stalemate, and other draw conditions.  

## Code Architecture

The board was represented by a two-dimensional array, with piece objects inside that array (and undefined values to represent empty squares). The project is object oriented, with each different piece class (eg. King, Queen) inheriting from a generic Piece class. The board and game itself are also objects.  

Part way through the project, I decided to implement an MVC (model-view-controller) architecture. The benefits of this architecture lie in the separation of logic - how the program implements the game is kept entirely separate from how it is displayed in the browser. This makes the code inherently reusable - it's essentially a plug & play system, where the backend can be plugged into any front end implementation (to give an out-there example, it could work with a VR game).  

This however was never implemented fully - while the logic is mostly separated, there is some view logic inside what should be the controller. Had I had more time or were to restart the project, I would keep the MVC architecture in mind from the start to avoid this.