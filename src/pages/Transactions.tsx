import {FC} from "react";
import { TransactionForm } from '../components/TransactionForm.tsx'
import { instance } from '../api/axios.api.ts'
import { ICategory, IResponseTransactionLoader, ITransaction } from '../types/types.ts'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TransactionTable } from '../components/TransactionTable.tsx'
import { formatToUSD } from '../helper/currency.helper.ts'
import { Charts } from '../components/Charts.tsx'

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories')
    const transactions = await instance.get<ITransaction[]>('/transactions')
    const totalIncome = await instance.get('/transactions/income/find')
    const totalExpense = await instance.get('/transactions/expense/find')

    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalExpense: totalExpense.data,
        totalIncome: totalIncome.data
    }
    return data
}
export const transactionAction = async ({request}: any) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData()
            const newTransaction = {
                title: formData.get('title'),
                amount: +formData.get('amount'),
                category: formData.get('category'),
                type: formData.get('type'),
            }
            await instance.post('/transactions', newTransaction)
            toast.success('Transaction successfully created')
            return null
        }
        case "DELETE": {
            const formData = await request.formData()
            const transactionId = formData.get('id')
            await instance.delete(`/transactions/transactions/${transactionId}`)
            toast.success('Transaction successfully deleted')
            return null
        }

    }
}

export const Transactions:FC = () => {
    const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader

    return (
       <>
            <div className='grid grid-cols-3 gap-4 items-start mt-4'>
                <div className='grid col-span-2'>
                    <TransactionForm/>
                </div>
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className='uppercase text-md font-bold text-center'>Total income</p>
                            <p className='bg-green-500 p-1 rounded-sm text-center mt-2'>
                                {formatToUSD.format(totalIncome) }
                            </p>
                        </div>
                        <div>
                            <p className='uppercase text-md font-bold text-center'>Total Expense</p>
                            <p className='bg-red-500 p-1 rounded-sm text-center mt-2'>
                                {formatToUSD.format(totalExpense)}
                            </p>
                        </div>
                    </div>
                    <><Charts totalIncome={totalIncome} totalExpense={totalExpense}/></>
                </div>
            </div>
       {/* Transaction table   */}
           <h1 className='my-5'>
               <TransactionTable limit={5}/>
           </h1>
       </>
    );
};
