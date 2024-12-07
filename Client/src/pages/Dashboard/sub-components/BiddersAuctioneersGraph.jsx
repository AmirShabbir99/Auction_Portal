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
import { Line } from "react-chartjs-2";
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

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

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
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#87cefa", // Light blue
        backgroundColor: "rgba(135, 206, 250, 0.2)",
        pointBackgroundColor: "#87cefa",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#ff4500", // Deep orange
        backgroundColor: "rgba(255, 69, 0, 0.2)",
        pointBackgroundColor: "#ff4500",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#1e3a5c", // Navy grid color
        },
        ticks: {
          color: "#87cefa", // Light blue labels
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        grid: {
          color: "#1e3a5c", // Navy grid color
        },
        ticks: {
          color: "#87cefa", // Light blue labels
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
        text: "Number of Bidders and Auctioneers Registered",
        color: "#ffffff", // White title
        font: {
          size: 18,
        },
      },
      legend: {
        labels: {
          color: "#ffffff", // White legend labels
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#12294a", // Tooltip navy background
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div className="bg-[#0a1a2e] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-[#87cefa] mb-4">
        Bidders vs Auctioneers
      </h2>
      <div className="relative h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BiddersAuctioneersGraph;
