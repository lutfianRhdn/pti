
# SpaaceVista

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/) [![NEXTJS](https://img.shields.io/badge/Next.js-13-green.svg)](https://nextjs.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-lastest-green.svg)](https://tailwindcss.com/) [![Mysql](https://img.shields.io/badge/mysql-lastest-green.svg)](https://www.mysql.com/) [![Prisma](https://img.shields.io/badge/Prisma-lastest-green.svg)](https://www.prisma.io/)

## Project Description

## Table of Content

 - [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)
 - [How to Use the Project](#How-to-Use-the-Project)
 - [Credits](#Credits)
 - [License](#license)
 - [How to Contribute to the Project](#How-to-Contribute-to-the-Project)

## How to Install and Run the Project
To install and run the SpaaceVista project locally, please follow these steps:

 1.Clone the repository from GitHub:    
```bash
  git clone https://github.com/lutfianRhdn/SpaaceVista.git
```

Navigate to the project directory:
```bash
  cd SpaaceVista
```
Install the project dependencies using a package manager such as npm or yarn:
```bash
  npm install
```
or
```bash
  yarn install
```
Copy example environment file to new file
```bash
  cp .env.example .env
```

Generate Prisma Client.
```bash
  npx prisma generate
```

Migrate Database.
```bash
  npm run prisma:migrate dev
```

Run the development server.
```bash
  npm run dev
```
or
```bash
  yarn dev
```
Access the website locally at http://localhost:3000.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
`DATABASE_URL`
`NEXT_PUBLIC_BASE_URL`
`NEXT_PUBLIC_API_URL`
`NEXTAUTH_SECRET`
`NEXTAUTH_URL`

## License

This project is licensed under the MIT License.


