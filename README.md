## Hotel Management API

### Intallation
```bash
npm i

docker compose -f database.yml up -d
``` 

### Modules

<details>
<summary>Auth modules</summary>

| Routes  | Body(1) / Param(2) | 
| :--: | :--: |
| `v1/auth/login`  | [1] **userName**: string, **password**: string |
| `v1/auth/register`  | [1] **userName**: string, **password**: string **email**: string, **fullName**: string, **phone**: string, **gender**: number, **salary**: number, **field**: number, **city**: string, **country**: string, **roleId**: number |

</details>