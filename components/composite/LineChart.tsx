import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

interface RevenueChartProps {
  data: any;
  options: any;
}

const RevenueChart = ({ data, options }: RevenueChartProps) => {
  return (
    <div className='bg-white mt-5 px-8 pt-4 rounded-xl w-[120vh] mx-auto'>
      {/* Chart */}
      <Bar id='chart' data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
