function ProductRow({ product, color }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr className={color}>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
export default ProductRow;
