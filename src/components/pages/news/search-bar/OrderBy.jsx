const OrderBy = ({ searchParams, setSearchParams, orderQuery }) => {

  const setOrderQuery = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  return (
    <div id="order-btns">
      <span>
        Order
      </span>
      <div id="order-btn-container">
        <button
          className="order-btn"
          id="asc-btn"
          onClick={() => setOrderQuery("asc")}
          disabled={orderQuery === "asc"}>
          Ascending
        </button>
        <button
          className="order-btn"
          id="desc-btn"
          onClick={() => setOrderQuery("desc")}
          disabled={!orderQuery || orderQuery === "desc"}>
          Descending
        </button>
      </div>
    </div>
  );
};

export default OrderBy;
