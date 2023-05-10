import ExpensesTable from '@/components/expensesTable'
import NavButton from '@/components/navButton'
import { Container, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import styles from './expenses.module.scss'
import { InputTextField } from '@/components/signMethods/signIn'
import { FormEvent, useState } from 'react'
import expenses from '../../data/expenses.json'
import { database, auth } from '../../libs/firebase.js'
import { onValue, push, ref, set } from 'firebase/database'

type Expense = {
    id: string;
    title: string;
    price: number;
    category: string;
}

export default function Expenses() {

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [category, setCategory] = useState<string>("")

    function handleCreateExpense(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const userId = auth.currentUser?.uid
        const expensesRef = ref(database, "expenses")

        const expenseData = {
            userId: userId,
            title: title,
            price: price,
            category: category,
        }

        const newExpensesRef = push(expensesRef)
        set(newExpensesRef, {
            userId: userId,
            title: title,
            price: price,
            category: category,
        })
        console.log(expenseData)
    }

    return (
        <Container>
            <section className={styles.expenses}>
                <div className={styles.forms}>
                    <NavButton title='Back to home' />
                    <section>
                    <h1>Add Expense / Investment</h1>
                    <form onSubmit={handleCreateExpense} className={styles.formsBox}>
                        <span>
                        <InputTextField 
                        id="title" 
                        label="Title" 
                        variant="outlined" 
                        type="string" 
                        style={{width: "200px"}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                        </span>
                        <span>
                        <InputTextField 
                        id="title" 
                        label="Price" 
                        variant="outlined" 
                        type="string" 
                        style={{width: "100px"}}
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}/>
                        </span>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="category"
                                value={category}
                                label="Category"
                                style={{width: "200px", fontFamily: "inherit"}}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {/* <MenuItem disabled value=""><em>Category</em></MenuItem> */}
                                {expenses.map((expense) => (
                                    <MenuItem style={{fontFamily: "inherit"}} key={expense.id} value={expense.category}>{expense.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <button type='submit'>+</button>
                    </form>
                    </section>
                    <NavButton title='Expenses charts' />
                </div>
                <div className={styles.categoriesTable}>
                    <ExpensesTable />
                </div>
            </section>
        </Container>
    )
}