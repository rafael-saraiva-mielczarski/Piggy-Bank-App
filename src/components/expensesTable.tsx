import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../pages/expenses/expenses.module.scss'
import { categories } from '../data/categories'
import expenses from '../data/expenses.json'

export default function ExpensesTable() {

    return (
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
                        {expenses.map((expense) => (
                            <TableRow key={expense.id}>
                            <TableCell className={styles.categorieData}>{expense.title.toUpperCase()}</TableCell>
                            <TableCell align="center" className={styles.categorieData}>{expense.price} $</TableCell>
                            <TableCell align="center" className={styles.categorieData}><span style={{background: categories[expense.category].color, padding: "15px", borderRadius: "15px", fontFamily: "inherit"}} >
                                {categories[expense.category].title}
                                </span></TableCell>
                            <TableCell align="center" className={styles.categorieData}><DeleteIcon color="error"/></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
    )
}