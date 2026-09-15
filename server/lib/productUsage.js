async function productColumnNames(pool) {
  const [columns] = await pool.query("SHOW COLUMNS FROM products");
  return new Set(columns.map((column) => column.Field));
}

async function countProductsUsing(pool, { idColumn, nameColumn, id, name }) {
  const fields = await productColumnNames(pool);
  let count = 0;

  if (fields.has(idColumn)) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS n FROM products WHERE \`${idColumn}\` = ?`,
      [id]
    );
    count += Number(rows[0].n);
  }

  if (fields.has(nameColumn)) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS n FROM products WHERE LOWER(\`${nameColumn}\`) = LOWER(?)`,
      [name]
    );
    count += Number(rows[0].n);
  }

  return count;
}

module.exports = {
  countProductsUsing,
};
