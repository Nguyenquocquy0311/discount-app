import { useState } from "react";
import { Select } from "antd";
import RevenueChart from "../LineChart";

// Ant Design Select Option
const { Option } = Select;

const ChartTab = () => {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024'); // Default year

  // Fake asset data
  const assets = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
  ];

  // Available years
  const years = ['2022', '2023', '2024'];

  // Fake revenue data for each month (per asset, per year)
  const revenueData: Record<string, Record<string, number[]>> = {
    '2022': {
      '': [900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
      'Product A': [400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950],
      'Product B': [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
      'Product C': [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
    },
    '2023': {
      '': [1000, 1200, 1500, 1700, 1600, 1800, 1900, 2100, 2200, 2400, 2500, 2700],
      'Product A': [500, 600, 700, 800, 750, 850, 900, 1000, 1100, 1200, 1300, 1400],
      'Product B': [300, 400, 500, 600, 550, 600, 700, 800, 900, 1000, 1100, 1200],
      'Product C': [200, 200, 300, 300, 300, 350, 400, 500, 500, 600, 600, 700],
    },
    '2024': {
      '': [1100, 1300, 1400, 1600, 1500, 1700, 1800, 2000, 2100, 2300, 2400, 2600],
      'Product A': [600, 650, 700, 800, 750, 850, 900, 1000, 1100, 1200, 1300, 1350],
      'Product B': [350, 400, 450, 500, 550, 600, 700, 750, 800, 850, 900, 950],
      'Product C': [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
    },
  };

  // Handle asset change
  const handleAssetChange = (value: string) => {
    setSelectedAsset(value);
  };

  // Handle year change
  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  // Data for chart based on selected asset and year
  const chartData = revenueData[selectedYear][selectedAsset || ''];

  const data = {
    labels: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: chartData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
      },
    },
  };

  return (
    <div className="bg-white mt-20 px-10 h-[85vh] rounded-xl">
      {/* Header */}
      <div className="grid grid-flow-col justify-between py-5">
        <div className="flex items-center">
          <label htmlFor="year-select" className="text-lg">Doanh thu năm</label>
          {/* Year Selector using Ant Design Select */}
          <Select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="mx-4"
            style={{ width: 120 }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
        
        <div className="flex items-center mb-4">
          {/* Asset Selector using Ant Design Select */}
          <label htmlFor="asset-select" className="text-[16px]">Chọn sản phẩm:</label>
          <Select
            id="asset-select"
            value={selectedAsset}
            onChange={handleAssetChange}
            className="mx-4"
            style={{ width: 200 }}
            placeholder="Tất cả tài sản"
          >
            <Option value="">Tất cả tài sản</Option>
            {assets.map((asset) => (
              <Option key={asset.id} value={asset.name}>
                {asset.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Pass data to RevenueChart */}
      <RevenueChart data={data} options={options} />
    </div>
  );
};

export default ChartTab;
