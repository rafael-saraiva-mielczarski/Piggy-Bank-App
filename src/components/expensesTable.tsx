import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../pages/expenses/expenses.module.scss'
import { categories } from '../data/categories'
import { get, ref } from 'firebase/database'
import { ExpenseData } from '@/interfaces/expenseData';
import { database } from '@/libs/firebase';
import { useState, MouseEvent } from 'react';

export default function ExpensesTable() {

    const [expenseData, setExpenseData] = useState<ExpenseData[] | []>([])
    const expensesRef = ref(database, "expenses")

    function handleGetExpenses(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        // onValue(expensesRef, (snapshot) => {
        //     const data: ExpenseData = [];
        //     snapshot.forEach(childSnapshot => {
        //         const key = childSnapshot.key
        //         const expense = childSnapshot.val()
        //         data.push({"key": key, "expense": expense})
        //     });
        //     setExpenseData(data)
        // } )
        get(expensesRef).then((snapshot) => {
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
                console.log(expenseData)
            } else {
                console.log("No data available")
            }
        }).catch((err) => (
            console.log(err)
        ))
    }

    return (
        <div>
            <button onClick={handleGetExpenses}>get data</button>
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
                    <TableCell align="center" className={styles.categorieData}><DeleteIcon color="error" /></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}