import IncomeImg from '../../assets/Income.svg'
import OutcomeImg from '../../assets/Outcome.svg'
import TotalImg from '../../assets/Total.svg'

import { useTransactions } from '../../hooks/useTransactions'

import { Container } from './styles'

export function Summary(){

    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit'){
           acc.deposits += transaction.amount;
           acc.total += transaction.amount;
        } else{
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    console.log(transactions);

    return(
        
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt='Entradas'></img>
                </header>
                <strong> 
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)} 
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt='Saídas'></img>
                </header>
                <strong>  
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)} 
                </strong>
            </div>
            <div className='hightlight-background'>
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt='Total'></img>
                </header>
                <strong>  
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)} 
                </strong>
            </div>
        </Container>
    )
}