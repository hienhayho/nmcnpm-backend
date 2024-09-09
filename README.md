## Hotel Management API

### Installation

```bash
npm i

docker compose -f database.yml up -d
```

### Export data from database
```bash
docker exec -t <pg_container> pg_dumpall -c -U <DB_USERNAME> > database.sql
```

### Restore database
```bash
cat database.sql | docker exec -i <pg_container> psql -U <DB_USERNAME> -d <DB_NAME>
```

### Documentation

```bash
npx @compodoc/compodoc -p tsconfig.json -s
```

> Note: Serving documentation from ./documentation/ at <http://127.0.0.1:8080>
