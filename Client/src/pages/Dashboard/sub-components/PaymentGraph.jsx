import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#87cefa", // Light blue for bars
        borderColor: "#1e90ff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#1e3a5c", // Navy blue grid lines
        },
        ticks: {
          color: "#87cefa", // Light blue text
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 5000,
        grid: {
          color: "#1e3a5c", // Navy blue grid lines
        },
        ticks: {
          color: "#87cefa", // Light blue text
          font: {
            size: 14,
          },
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        color: "#ffffff", // White title text
        font: {
          size: 18,
        },
      },
      legend: {
        labels: {
          color: "#ffffff", // White legend text
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#12294a", // Navy tooltip background
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div className="bg-[#0a1a2e] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-[#87cefa] mb-4">
        Payment Statistics
      </h2>
      <div className="relative h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PaymentGraph;
