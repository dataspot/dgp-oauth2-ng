# budgetkey-ng2-auth


## Install

Install latest [Node 8](https://nodejs.org/en/)

```
npm install
```


## Start example app

```
npm start
```

Example app is available at http://localhost:4000


## Install source into container app

Allows to debug the app integration in a container app

```
npm run install-into ../target-app-directory
```


## Start the auth server

The docker compose environment starts everything required to run a local auth server for testing

It requires secret files / environment variables for the ssl and tokens, see below on a suggested method to create new ones

Once you have the required files, start the environment:

```
docker-compose up
```

Auth server is available at https://localhost:8001/auth/check


## Generate required auth tokens and certificate

To get GitHub OAuth keys, [create a new OAuth App](https://github.com/settings/applications) with the following details:
* Homepage URL: `https://localhost:8001/`
* Authorization callback URL: `https://localhost:8001/auth/oauth_callback`

Following commands generates the required keys and creates the `secret.env` file which is used to provide parameters to the auth server, see [datahq/auth](https://github.com/datahq/auth) for more details.

```
openssl genrsa -out secret.tmpkey 2048
openssl rsa -in secret.tmpkey -out secret-private.pem -outform pem
openssl rsa -in secret.tmpkey -out secret-public.pem -outform pem -pubout
echo "PRIVATE_KEY=`echo $(cat secret-private.pem)`
PUBLIC_KEY=`echo $(cat secret-public.pem)`
GOOGLE_KEY=
GOOGLE_SECRET=
GITHUB_KEY=
GITHUB_SECRET=
DATABASE_URL=postgresql://postgres:123456@db:5432/postgres
EXTERNAL_ADDRESS=" > secret.env
rm secret.tmpkey secret-private.pem secret-public.pem
```

Generate self-signed ssl certificates for traefik:

```
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=localhost" -keyout traefik.key -out traefik.crt
```
