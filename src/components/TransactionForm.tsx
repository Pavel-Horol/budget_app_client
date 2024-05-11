import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { IResponseTransactionLoader } from '../types/types.ts'
import { CategoryModal } from './CategoryModal.tsx'

export const TransactionForm:FC = () => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false)
	const { categories } = useLoaderData() as IResponseTransactionLoader

	return (
		<div className='rounded-md bg-slate-800 p-4'>
			<Form className='grid gap-2' method='post' action='/transactions'>
				<label className='grid' htmlFor='title'>
					<span>Title</span>
					<input type='text' className='input border-slate-700 ' placeholder='title...' name='title' required />
				</label>
				<label className='grid' htmlFor='title'>
					<span>Amount</span>
					<input type='number' className='input border-slate-700' placeholder='amount...' name='amount' required />
				</label>
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Category</span>
						<select name="category" className="input border-slate-700" required>
							{categories.map((ctg, index) => (
								<option key={index} value={ctg.id}>{ctg.title}</option>
								))}
						</select>
					</label>
				) : (
					<h1 className='mt-1 text-red-300'>To continue create a new category...</h1>
				)}
				<button
					onClick={() => setVisibleModal(true)}
					className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
					<span>Manage Categories:</span>
					<FaPlus />
				</button>
				<div className="flex items-center gap-4">
					<label className='flex cursor-pointer items-center gap-2'>
						<input type='radio' name='type' value='income' className='form-radio text-blue-600' />
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input type="radio" name="type" value="expense" className="form-radio text-blue-600" />
						<span>Expense</span>
					</label>
				</div>

				<button type='submit' className='btn-green btn max-w-fit mt-2'>
					Submit
				</button>
			</Form>

			{visibleModal && (
				<CategoryModal type='post' setVisibleModal={setVisibleModal}/>
			)}
		</div>
	)
}
