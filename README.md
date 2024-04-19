## Hotel Management API

### Installation

```bash
npm i

docker compose -f database.yml up -d
```

### Documentation

```bash
npx @compodoc/compodoc -p tsconfig.json -s
```

> Note: Serving documentation from ./documentation/ at <http://127.0.0.1:8080>

### Modules

<details>
<summary>Auth modules</summary>

Source: [src](src/v1/auth)

| Routes  | Method | Description | Key | More |
| :--: | :--: | :-- | :-- | :--: |
| `v1/auth/login`  | POST | User login | `userName`: string, `password`: string | Body |
| `v1/auth/register`  | POST | User registration | `userName`: string, `password`: string, `email`: string, `fullName`: string, `phone`: string, `gender`: number, `salary`: number, `city`: string, `country`: string | Body |

</details>

<details>
<summary>Role modules</summary>

Source: [src](src/v1/database/role/)

| Routes  | Method | Description | Key | More |
| :--: | :--: | :-- | :-- | :--: |
| `v1/role`  | GET | Get all roles. | - | - |
| `v1/role`  | POST | Add new role. | `id`: number, `name`: string | Body |
|`v1/role`| PATCH | Update a role by ID | `id`: number, `name`: string | Body |
| `v1/role/get-role-by-id/{id}`  | GET | Get role by Id. | `id`: number | Param |
</details>
