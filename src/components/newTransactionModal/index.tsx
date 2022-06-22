import Modal from 'react-modal';
import IncomeImg from '../../assets/Income.svg';
import OutcomeImg from '../../assets/Outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import { useTransactions } from '../../hooks/useTransactions';

import { FormEvent, useState } from 'react';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose : () => void;
}

export function NewTransactionModal( { isOpen , onRequestClose } : NewTransactionModalProps) {
    
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
       event.preventDefault()

        await createTransaction({
           title,
           category,
           amount,
           type,
       })

       setTitle('');
       setAmount(0);
       setCategory('');
       setType('deposit');

       onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-model-content'>

                <button type='button' onClick={onRequestClose} className="react-modal-close">
                    <img src={closeImg} alt="Fechar Modal" />
                </button>
                <Container onSubmit={handleCreateNewTransaction}>
                    <h2>Cadastrar transação</h2>

                    <input placeholder='Título' value={title} onChange={event => setTitle(event.target.value)}></input>

                    <input placeholder='Valor' type="number" value={amount} onChange={event => setAmount(Number(event.target.value))}></input>
                    
                    <TransactionTypeContainer>
                        <RadioBox type="button" onClick={() => {setType('deposit')} } isActive={type === 'deposit'} activeColor='green'> <img src={IncomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                        </RadioBox>
                        <RadioBox type="button" onClick={() => {setType('withdraw')} } isActive={type === 'withdraw'} activeColor='red'> <img src={OutcomeImg} alt="Saída"/> 
                        <span>Saída</span>
                        </RadioBox>
                    </TransactionTypeContainer>

                    <input placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)}></input>

                    <button type="submit">Cadastrar</button>
                </Container>
      </Modal>
    );
}