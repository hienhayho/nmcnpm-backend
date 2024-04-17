## Hotel Management API

### Intallation
```bash
npm i

docker compose -f database.yml up -d
``` 

### Modules

<details>
<summary>Auth modules</summary>

Source: [src](src/v1/auth)

| Routes  | Method | Description | Key | More | 
| :--: | :--: | :-- | :-- | :--: |
| `v1/auth/login`  | POST | User login | `userName`: string, `password`: string | Body |
| `v1/auth/register`  | POST | User registration | `userName`: string, `password`: string, `email`: string, `fullName`: string, `phone`: string, `gender`: number, `salary`: number, `field`: number, `city`: string, `country`: string, `roleId`: number | Body |

</details>

<details>
<summary>Role modules</summary>

Source: [src](src/v1/database/role/)

| Routes  | Method | Description | Key | More |
| :--: | :--: | :-- | :-- | :--: |
| `v1/role`  | GET | Get all roles. | - | - |
| `v1/role`  | POST | Add new role. | `id`: number, `name`: string | Body |

</details>