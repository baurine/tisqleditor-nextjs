import { connect } from "@tidbcloud/serverless";

type SchemaRes = {
  name: string;
  tables: {
    name: string;
    columns: {
      col: string;
      data_type: string;
      nullable: boolean;
    }[];
  }[];
}[];

export async function GET() {
  const conn = connect({
    url: process.env.DATABASE_URL,
  });

  let schema: SchemaRes = [];

  // step 1: get all databases
  let dbs = await conn.execute("show databases");
  // responses:
  // [
  //   {
  //       "Database": "INFORMATION_SCHEMA"
  //   },
  //   {
  //       "Database": "PERFORMANCE_SCHEMA"
  //   },
  //   {
  //       "Database": "game"
  //   },
  //   ...
  // ]
  schema = (dbs as any[])
    .map((db) => db.Database)
    .filter(
      (db) =>
        ![
          "INFORMATION_SCHEMA",
          "PERFORMANCE_SCHEMA",
          "lightning_task_info",
          "mysql",
        ].includes(db)
    )
    .sort()
    .map((db) => ({ name: db, tables: [] }));
  console.log("dbs:", schema);

  // step 2: get tables for each db
  for (let i = 0; i < schema.length; i++) {
    const db = schema[i];
    const tables = await conn.execute(
      `
SELECT
  TABLE_NAME as name
FROM
  information_schema.tables
WHERE
  table_schema = ?
ORDER BY
  name ASC`,
      [db.name]
    );
    db.tables = (tables as any[]).map((t) => ({ ...t, columns: [] }));

    // step 3: get columns for each table
    for (let j = 0; j < db.tables.length; j++) {
      const table = db.tables[j];

      const columns = await conn.execute(
        `
SELECT
  COLUMN_NAME as col, DATA_TYPE as data_type, IS_NULLABLE as is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = ? AND table_name = ?
ORDER BY
  col ASC`,
        [db.name, table.name]
      );
      table.columns = (columns as any[]).map((c) => ({
        col: c.col,
        data_type: c.data_type,
        nullable: c.is_nullable === "YES",
      }));
    }
  }
  return Response.json(
    { code: 200, message: "ok", data: schema },
    {
      headers: {
        "cache-control": "public, s-maxage=3600",
      },
    }
  );
}
