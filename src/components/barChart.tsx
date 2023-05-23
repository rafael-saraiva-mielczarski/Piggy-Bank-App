import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

type ChartProps = {
    chartData: any
}

export default function BarChart({chartData}:ChartProps) {
    
      return <Bar data={chartData}/>
}