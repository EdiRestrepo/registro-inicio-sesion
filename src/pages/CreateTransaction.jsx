import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearFormError, clearMessage, setFormError } from "../redux/transactions/slice";
import { useNavigate } from "react-router-dom";
import { createTransactions } from "../redux/transactions/operations";

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {token} = useSelector((state)=>state.auth)
  const { isLoading, error, formError, message } = useSelector((state) => state.transactions);

   const handleCreateTransaction = (e) => {
     e.preventDefault();
     const {
       category, amount, reason
     } = e.target.elements;
     const transaction = {
       category: category.value,
       amount: amount.value,
       reason: reason.value,
     };

     if (category.value && amount.value && reason.value) {
       dispatch(createTransactions({token, transaction}));
     } else {
       dispatch(setFormError("Verify the provided info and try again."));
     }
   };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

   useEffect(() => {
     if (formError) {
       toast.error(formError);
       dispatch(clearFormError());
     }
   }, [dispatch, formError]);
  
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message]);

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
      <h1>CreateTransaction.</h1>
      <h3
        style={{
          textDecoration: "none",
          color: "unset",
          borderBottom: "2px solid back",
          cursor: "pointer",
        }}
        onClick={() => nav(-1)}
      >
        Go back to transaction list
      </h3>
      <form
        onSubmit={handleCreateTransaction}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          padding: 15,
        }}
      >
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Category
          <select type="text" name="categoriy">
            <option value="revenue">Revenue</option>
            <option value="expense">Expense</option>
            <option value="grant">Grant</option>
            <option value="loss">Loss</option>
            <option value="loan">Loan</option>
            <option value="loanPayment">Loan Payment</option>
            <option value="debt">Debt</option>
            <option value="debtPayment">Debt Payment</option>
          </select>
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Amount
          <input type="text" name="amount" />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Reason
          <input type="text" name="reason" />
        </label>
        <button type="submit" style={{ marginTop: 20 }} disabled={isLoading}>
          {isLoading ? "Loading...":"Send"}
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
