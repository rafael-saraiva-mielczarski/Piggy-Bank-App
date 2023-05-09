import ExpensesTable from '@/components/expensesTable'
import NavButton from '@/components/navButton'
import { Container, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import styles from './expenses.module.scss'
import { InputTextField } from '@/components/signMethods/signIn'
import { useState } from 'react'
import expenses from '../../data/expenses.json'

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

    function handleSubmit() {

    }

    return (
        <Container>
            <section className={styles.expenses}>
                <div className={styles.forms}>
                    <NavButton title='Back to home' />
                    <section>
                    <h1>Add Expense / Investment</h1>
                    <form onSubmit={handleSubmit} className={styles.formsBox}>
                        <span>
                        <InputTextField 
                        id="title" 
                        label="Title" 
                        variant="outlined" 
                        type="string" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                        </span>
                        <span>
                        <InputTextField 
                        id="title" 
                        label="Price" 
                        variant="outlined" 
                        type="string" 
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
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem disabled value=""><em>Category</em></MenuItem>
                                {expenses.map((expense) => (
                                    <span key={expense.id}><MenuItem value={expense.category}>{expense.title}</MenuItem></span>
                                ))}
                            </Select>
                        </FormControl>
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