type Category = {
    [tag: string]: {
        id: number;
        title: string;
        color: string;
    }
}

export const categories: Category = {
    food: {id: 1, title: "Food", color: "#F797FF"},
    enjoyment: {id: 2, title: "Enjoyment", color: "#FFD0F5"},
    education: {id: 3, title: "Education", color: "#FF97E8"},
    bills: {id: 4, title: "Bills", color: "#F57CFF"},
    health: {id: 5, title: "Health", color: "#8EBBFF"},
    others: {id: 6, title: "Others", color: "#64A2FF"},
    transportation: {id: 7, title: "Transportation", color: "#B98EFF"},
    investments: {id: 8, title: "Investments", color: "#9757FF"}
}