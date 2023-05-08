import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './expenses.module.scss'
import categories from '../../data/categories.json'

export default function Expenses() {

    return (
        <Container>
            <section className={styles.expenses}>
                <div className={styles.forms}>
                    <h1>Add Expense / Investment</h1>
                </div>
                <div className={styles.categoriesAccordion}>
                    {categories.map((category) => (
                        <Accordion 
                        className={styles.accordion} 
                        sx={{background: category.color}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={styles.font}>{category.title}</Typography>
                            <p>00$</p>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography className={styles.font}>
                                {category.title}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </section>
        </Container>
    )
}