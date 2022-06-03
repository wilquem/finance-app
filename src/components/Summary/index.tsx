import { Container } from "./styles";
import entradaImg from "../../assets/entradas.svg";
import saidaImg from "../../assets/saidas.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();
/* 
  const totalDeposits = transactions.reduce((acc, transactions) => {
    if (transactions.type === "deposit") {
      return acc + transactions.amount;
    }

    return acc;
  }, 0); */

  const summary = transactions.reduce((acc,transaction) => {
    if( transaction.type === 'deposit'){
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    }else {
      acc.withdraw += transaction.amount
      acc.total -= transaction.amount
    }
    
    return acc
  }, {
    deposits:0,
    withdraw: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradaImg} alt="Entradas" />
        </header>
        <strong>
        {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={saidaImg} alt="Saídas" />
        </header>
        <strong>
        {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
        {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
