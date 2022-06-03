import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/fechar.svg";
import entradaImg from "../../assets/entradas.svg";
import saidasImg from "../../assets/saidas.svg";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle('');
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          type="text"
          placeholder="Nome"
        />

        <input
          onChange={(event) => setAmount(Number(event.target.value))}
          value={amount}
          type="number"
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
            type="button"
          >
            <img src={entradaImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
            type="button"
          >
            <img src={saidasImg} alt="Saida" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          type="text"
          placeholder="Categoria"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
