import styles from "./ElectionPage.module.css";
import Sidebar from "../../ui/Sidebar/Sidebar";
import Navbar from "../../ui/Navbar/Navbar";
import ElectionPageData from "../../ui/ElectionPageData/ElectionPageData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { UserData } from "../../ui/LineChart/Data";
import LineChart from "../../ui/LineChart/LineChart";
import { useState, useRef, useEffect, useContext } from "react";
import ElectionItemContext from "../../contexts/electionItem-context";
import Chart from "chart.js/auto";

const ElectionPage = (props) => {
  const electionItemCtx = useContext(ElectionItemContext);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [delayed, setDelayed] = useState(false);

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "No of Votes",
        data: UserData.map((data) => data.votesCasted),
        fill: true,
        borderColor: "#fff",
        borderWidth: 2,
        tension: 0.3,
        hitRadius: 20,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(0 , 0 , 255 ,0.3)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(58,255,213,1)",
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: UserData.map((data) => data.year),
      },
      y: {
        beginAtZero: true,
      },
    },

    animation: {
      onComplete: () => {
        setDelayed(true);
      },
      duration: 1000, // Set the duration in milliseconds
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 50;
        }
        return delay;
      },
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(58,255,213,1)");
      gradient.addColorStop(1, "rgba(0 , 0 , 255 ,0.3)");

      // Update the state with the new dataset including the backgroundColor
      setUserData((prevUserData) => ({
        ...prevUserData,
        datasets: [
          {
            ...prevUserData.datasets[0],
            backgroundColor: gradient,
          },
        ],
      }));
    }

    return () => {
      // Cleanup: Destroy the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.electionPageCover}>
        <Sidebar eid = {electionItemCtx.electionId}/>
        <div className={styles.pageContent}>
          <div className={styles.pageContentLeft}>
            <h2>Overview</h2>
            <div className={styles.electionInfo}>
              <div className={styles.electionInfoUp}>
                <h2>{electionItemCtx.title}</h2>
              </div>
              <div className={styles.electionInfoDown}>
                <h3>{electionItemCtx.organizer}</h3>
                <div className={styles.electionDate}>
                  <CalendarTodayOutlinedIcon className={styles.icon} />
                  <p>11/30 - 12/22</p>
                </div>
              </div>
            </div>
            <div className={styles.lineChartCover}>
              <canvas id="myChart" ref={canvasRef} className={styles.canvas} />
              <LineChart chartData={userData} chartOptions={options} />
            </div>
          </div>
          <div className={styles.pageContentRight}>
            <div className={styles.infoBlocks}>
              <ElectionPageData eid = {electionItemCtx.electionId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionPage;
