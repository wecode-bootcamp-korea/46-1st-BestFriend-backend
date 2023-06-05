const appDataSource = require("./dataSource");

const getProductsById = async (productId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        sub_categories.name as sub_category_name,
        products.image_url,
        products.name,
        products.description,
        products.price
      FROM products
      INNER JOIN sub_categories ON sub_categories.id = products.sub_category_id
      WHERE products.id = ?
    `,
      [productId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getProductList = async (
  subCategoryId,
  isFlowerIncluded,
  isBerryIncluded,
  orderBy,
  offset = 0,
  limit = 9
) => {
  const conditionArr = [];
  let whereQuery = "";
  let sortQuery = "";
  let limitQuery = `LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

  if (subCategoryId)
    conditionArr.push(`products.sub_category_id IN (${subCategoryId})`);

  if (isFlowerIncluded)
    conditionArr.push(`products.is_flower_included IN (${isFlowerIncluded})`);

  if (isBerryIncluded)
    conditionArr.push(`products.is_berry_included IN (${isBerryIncluded})`);

  if (!!conditionArr.length)
    whereQuery = `WHERE` + ` ` + conditionArr.join(" AND ");

  switch (orderBy) {
    case "priceASC":
      sortQuery = `ORDER BY products.price ASC`;
      break;
    case "priceDESC":
      sortQuery = `ORDER BY products.price DESC`;
      break;
    default:
      sortQuery = `ORDER BY products.id`;
      break;
  }

  const total_count = await appDataSource.query(`
    SELECT SQL_CALC_FOUND_ROWS
      id,
      image_url,
      name,
      price
    FROM products
    ${whereQuery}
    ${sortQuery}
    `);

  const list = await appDataSource.query(`SELECT
      FOUND_ROWS() AS total_count,
      id,
      image_url,
      name,
      price
    FROM products
      ${whereQuery}
      ${sortQuery}
      ${limitQuery}
        `);

  const totalCount = list[0].total_count;
  const productList = list.map((product) => ({
    id: product.id,
    image_url: product.image_url,
    name: product.name,
    price: product.price,
  }));

  return {
    total_count: totalCount,
    list: productList,
  };
};

module.exports = {
  getProductsById,
  getProductList,
};
