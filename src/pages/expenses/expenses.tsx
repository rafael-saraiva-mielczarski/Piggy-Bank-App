import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import NavButton from '@/components/navButton'
import styles from './expenses.module.scss'
import { InputTextField } from '@/components/signMethods/signIn'
import { FormEvent, useState, useEffect } from 'react'
import expenses from '../../data/expenses.json'
import { database, auth } from '../../libs/firebase.js'
import { push, ref, set, onValue, remove } from 'firebase/database'
import { ExpenseData } from '@/interfaces/expenseData'
import { categories } from '@/data/categories';
import AddButton from '@/components/addButton';
import Link from 'next/link';
import pig from '../../assets/pig.png'
import Image from 'next/image'

export default function Expenses() {

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [category, setCategory] = useState<string>("")
    const [expenseData, setExpenseData] = useState<ExpenseData[] | []>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [haveData, setHaveData] = useState<boolean>(true)
    const userId = auth.currentUser?.uid
    const expensesRef = ref(database, `users/${userId}/expenses`)

    function handleCreateExpense(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newExpensesRef = push(expensesRef)
        set(newExpensesRef, {
            userId: userId,
            title: title,
            price: price,
            category: category,
        })

        setTitle("")
        setPrice(0)
        setCategory("")
    }

    useEffect(() => {
        setLoading(true)
        //get expenses on page load and update as new expense is added
        try {
            setLoading(true)
            onValue(expensesRef, (snapshot) => {
                if(snapshot.exists()) {
                    const responseData = Object.entries<ExpenseData>(snapshot.val() ?? []).map(([key, value]) => {
                        return {
                            id: key,
                            userId: value.userId,
                            title: value.title,
                            price: value.price,
                            category: value.category
                        }
                    })
                    setExpenseData(responseData)
                    setLoading(false)
                    setHaveData(true)
                } else {
                    setLoading(false)
                    setHaveData(false)
                }
            })
        } catch(err) {
            console.log(err);
        }
    }, [])

    function handleDeleteExpense(id: string) {
        const expensesRef = ref(database, `users/expenses/${id}`)
        remove(expensesRef)
        expenseData.pop()
    }

    return (
        <Container>
            <section className={styles.expenses}>
                <div className={styles.forms}>
                    <Link href="/home/home"><NavButton title='Back to home' /></Link>
                    <form onSubmit={handleCreateExpense} className={styles.formBox}>
                        <section className={styles.formHead}>
                            <h1>Add Expense / Investment</h1>
                            <AddButton/>
                        </section>
                        <section className={styles.formBody}>
                            <span style={{marginRight: "10px"}}>
                            <InputTextField 
                            id="title" 
                            label="Title" 
                            variant="outlined" 
                            type="string" 
                            style={{width: "180px"}}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                            </span>
                            <span style={{marginRight: "10px"}}>
                            <InputTextField 
                            id="price" 
                            label="Price" 
                            variant="outlined" 
                            type="number" 
                            placeholder='00'
                            style={{width: "80px"}}
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}/>
                            </span>
                            <FormControl fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    value={category}
                                    label="Category"
                                    style={{width: "200px", fontFamily: "inherit"}}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <MenuItem disabled value=""><em>Category</em></MenuItem>
                                    {expenses.map((expense) => (
                                        <MenuItem style={{fontFamily: "inherit"}} key={expense.id} value={expense.category}>{expense.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </section>
                    </form>
                    <Link href="/charts/charts"><NavButton title='Expenses charts' /></Link>
                </div>
                <div className={styles.categoriesTable}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={styles.head}>
                        <TableRow>
                            <TableCell className={styles.categorieHeader} align="left">Title</TableCell>
                            <TableCell className={styles.categorieHeader} align="center">Price</TableCell>
                            <TableCell className={styles.categorieHeader} align="center">Categorie</TableCell>
                            <TableCell className={styles.categorieHeader} align="center"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody >
                            {expenseData.map((expense) => (
                                <TableRow key={expense.id}>
                                <TableCell className={styles.categorieData}>{expense.title.toUpperCase()}</TableCell>
                                <TableCell align="center" className={styles.categorieData}>{expense.price} $</TableCell>
                                <TableCell align="center" className={styles.categorieData}><span style={{background: categories[expense.category].color, padding: "15px", borderRadius: "15px", fontFamily: "inherit"}} >
                                    {categories[expense.category].title}
                                    </span></TableCell>
                                <TableCell align="center" className={styles.categorieData}><DeleteIcon color="error" style={{cursor: "pointer"}} onClick={() => handleDeleteExpense(expense.id)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {loading && 
                    <div className={styles.loading}>
                        <h1>Loading...</h1>
                        <Image src={pig} alt="pig" className={styles.pigImg}/>
                    </div>}
                {!haveData && <h1 className={styles.noData}>No data available, please add new Expense</h1>}
                </div>
            </section>
        </Container>
    )
}