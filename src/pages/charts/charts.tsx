import LineChart from "@/components/barChart";
import { database } from '../../libs/firebase.js'
import { ref, onValue } from 'firebase/database'
import { ExpenseData } from '@/interfaces/expenseData'
import { useEffect, useState } from "react";

export default function Charts() {

    const expensesRef = ref(database, "users/expenses")
    const [expenseData, setExpenseData] = useState<ExpenseData[] | []>([])

    useEffect(() => {
        //get expenses on page load and update as new expense is added
        try {
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
                }
            })
        } catch(err) {
            console.log(err);
        }
    }, [])

    const foodData = expenseData.filter((expense) => {
        return expense.category === "food"
    })
    const enjoymentData = expenseData.filter((expense) => {
        return expense.category === "enjoyment"
    })
    const educationData = expenseData.filter((expense) => {
        return expense.category === "education"
    })
    const billsData = expenseData.filter((expense) => {
        return expense.category === "bills"
    })
    const healthData = expenseData.filter((expense) => {
        return expense.category === "health"
    })
    const othersData = expenseData.filter((expense) => {
        return expense.category === "others"
    })
    const transportationData = expenseData.filter((expense) => {
        return expense.category === "transportation"
    })
    const investmentsData = expenseData.filter((expense) => {
        return expense.category === "investments"
    })

    const foodValue = foodData.reduce((a, value) => a = a + value.price, 0)
    const enjoyment = enjoymentData.reduce((a, value) => a = a + value.price, 0)
    const education = educationData.reduce((a, value) => a = a + value.price, 0)
    const bills = billsData.reduce((a, value) => a = a + value.price, 0)
    const health = healthData.reduce((a, value) => a = a + value.price, 0)
    const others = othersData.reduce((a, value) => a = a + value.price, 0)
    const transportation = transportationData.reduce((a, value) => a = a + value.price, 0)
    const investments = investmentsData.reduce((a, value) => a = a + value.price, 0)


    const data = {
        labels: ["Food", "Enjoyment", "Education", "Bills", "Health", "Others", "Transportation", "Investments",],
        datasets: [{
          label: 'Expenses Chart',
          data: [foodValue, enjoyment, education, bills, health, others, transportation, investments],
          backgroundColor: [
          'rgb(247, 151, 255)',
          'rgb(255, 208, 245)',
          'rgb(255, 151, 232)',
          'rgb(245, 124, 255)',
          'rgb(142, 187, 255)',
          'rgb(100, 162, 255)',
          'rgb(185, 142, 255)',
          'rgb(151, 87, 255)'
          ],
          tension: 0.1
        }]
      };

    return(
        <div>
            <h1>Expenses charts</h1>
            <LineChart chartData={data} />
        </div>
    )
}