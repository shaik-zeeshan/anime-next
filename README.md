# anime-next

## Description
This repository contains the source code for Anime-next.

## Installation

### Clone the Repository
Clone this repository using Git:

```bash
git clone https://github.com/Zeeshan1101/anime-next.git
cd anime-next
```

### Environment Variables
Before running the project, make sure to set up your environment variables. Create an `.env` file in the root directory of the project and add the following variables:

```
ANILIST_DOMAIN=your_anilist_domain
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=your_redirect_uri
ANILIST_GRAPHQL=your_anilist_graphql
```

Replace `your_anilist_domain`, `your_client_id`, `your_client_secret`, `your_redirect_uri`, and `your_anilist_graphql` with the respective values provided by AniList or the necessary sources.

### Install Dependencies
Install the dependencies using package manager:
#### NPM
```bash
npm install
```
#### Yarn
```bash
yarn install
```
#### PNPM
```bash
pnpm install
```


### Generate the Types
Generate the types using the following command:
#### NPM
```bash
npm run generate
```
#### Yarn
```bash
yarn run generate
```
#### PNPM
```bash
pnpm run generate
```

### Run the Project
Run the project using the following command:
#### NPM
```bash
npm run dev
```
#### Yarn
```bash
yarn run dev
```
#### PNPM
```bash
pnpm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
