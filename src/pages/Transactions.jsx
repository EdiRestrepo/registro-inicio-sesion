import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchTransactions } from "../redux/transactions/operations";

const Transactions = () => {
  const dispatch = useDispatch();
  const { isLoading, items } = useSelector((state) => state.transactions);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTransactions(token));
  }, [dispatch, token]);

  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >

      <h1>{ user.firstName}&apos;s transactions</h1>
      <h3>
        <NavLink
          to="/create-trnsaction"
          style={{
            textDecoration: "none",
            color: "unset",
            borderBottom: "2px solid black",
          }}>
          Create a transaction
        </NavLink>
      </h3>
      {isLoading && <h2>Fetching transactions...</h2>}
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>
          {items.length > 0 && (
            <tbody>
              {items.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{ transaction.type}</td>
                  <td>{ transaction.category}</td>
                  <td>{ transaction.amount}</td>
                  <td>{ transaction.reason}</td>
                  <td>{ transaction.date}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default Transactions;
