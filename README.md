
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/sasmeka/Tickitz_Backend/tree/intermediate">
    <img src="https://camo.githubusercontent.com/72d4e416bd802a1abc16d86e9d7d7a62318fca378d103f97fda207ef7d61463d/68747470733a2f2f7974332e67677068742e636f6d2f7974632f414b65644f4c543759443978365069522d4366624262464333777a3257617469495a4672495f4930762d366b3d733930302d632d6b2d63307830306666666666662d6e6f2d726a" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Tickitz Backend</h3>

  <p align="center">
    <br />
    <a href="https://github.com/sasmeka/Tickitz_Backend/tree/intermediate"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project aims to build a Rest-API built using Node.js and other supporting modules with a focus on JavaScript.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This project is based on the following packages:

* [![javascript][javascript.js]][javascript-url]
* [![pg][pg.js]][pg-url]
* [![node][node.js]][node-url]
* [![express][express.js]][express-url]
* [![bcrypt][bcrypt.js]][bcrypt-url]
* [![cors][cors.js]][cors-url]
* [![dotenv][dotenv.js]][dotenv-url]
* [![jwt][jwt.js]][jwt-url]
* [![nodemailer][nodemailer.js]][nodemailer-url]
* [![multer][multer.js]][multer-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project worker can follow the steps below:

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sasmeka/Tickitz_Backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   
   #or
   
   yarn install
   ```
3. create a postgresql database and create a table and enter the data according to the files in the migration/sql folder
4. please configure the email account and database in .env
5. Run
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Install [postman](https://www.postman.com/)
2. Visit the following link to export tickitz postman workspace 
   ```sh
   https://www.postman.com/avionics-meteorologist-14374576/workspace/tickitz/collection/22380820-2a8492cd-b607-4943-b31d-9d8c50cc4543?action=share&creator=22380820
   ```
3. Import the workspace that you already have in stage 2 into the postman application
4. Go to tickitz workspace -> auth -> login. The default email and pass please use admin@mail.com and 123456. The token obtained can be used to access data
5. Please try to do get data with the token. To insert a token, you can do it on the authorization tab and select Bearer Token

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Verdi Sasmeka - [@vrd_meka](https://twitter.com/vrd_meka) - verdysas@gmail.com

Project Link: [https://github.com/sasmeka/Tickitz_Backend/tree/intermediate](https://github.com/sasmeka/Tickitz_Backend/tree/intermediate)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sasmeka/Tickitz_Backend.svg?style=for-the-badge
[contributors-url]: https://github.com/sasmeka/Tickitz_Backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sasmeka/Tickitz_Backend.svg?style=for-the-badge
[forks-url]: https://github.com/sasmeka/Tickitz_Backend/network/members
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/verdi-sasmeka-62b91b132/
[javascript.js]: https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript&logoColor=white
[javascript-url]: https://www.javascript.com/
[pg.js]: https://img.shields.io/badge/postgresql-20232A?style=for-the-badge&logo=postgresql&logoColor=#4169E1
[pg-url]: https://www.postgresql.org/
[node.js]: https://img.shields.io/badge/node.js-35495E?style=for-the-badge&logo=nodedotjs&logoColor=339933
[node-url]: https://nodejs.org/
[express.js]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[bcrypt.js]: https://img.shields.io/badge/bcrypt-000000?style=for-the-badge
[bcrypt-url]: https://www.npmjs.com/package/bcryptjs
[cors.js]: https://img.shields.io/badge/cors-000000?style=for-the-badge
[cors-url]: https://www.npmjs.com/package/cors
[dotenv.js]: https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white
[dotenv-url]: https://www.npmjs.com/package/dotenv
[jwt.js]: https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jwt-url]: https://www.npmjs.com/package/jsonwebtoken
[nodemailer.js]: https://img.shields.io/badge/nodemailer-000000?style=for-the-badge
[nodemailer-url]: https://www.npmjs.com/package/nodemailer
[multer.js]: https://img.shields.io/badge/multer-000000?style=for-the-badge
[multer-url]: https://www.npmjs.com/package/multer
