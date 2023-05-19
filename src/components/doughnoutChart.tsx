import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

type ChartProps = {
    chartData: any
}

export default function DoughnoutChart({chartData}:ChartProps) {
    
      return <Doughnut data={chartData}/>
}