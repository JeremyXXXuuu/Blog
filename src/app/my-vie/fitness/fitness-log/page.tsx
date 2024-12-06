"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LogData {
  exerciseName: string;
  date: string;
  reps: number;
  sets: number;
  weight: number;
}

export default function FitnessLogPage() {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/fitness-logs");
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const logsData = await response.json();
        console.log(logsData);
        setLogs(logsData);

        // Get unique exercise names
        const uniqueExercises = Array.from(
          new Set(logsData.map((log) => log.exerciseName))
        );
        setExercises(uniqueExercises);
        setSelectedExercise(uniqueExercises[0]);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) => log.exerciseName === selectedExercise
  );

  const chartData = {
    labels: filteredLogs.map((log) => format(parseISO(log.date), "MM/dd/yyyy")),
    datasets: [
      {
        label: "Weight (lbs)",
        data: filteredLogs.map((log) => log.weight),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Progress for ${selectedExercise}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fitness Progress Tracking</h1>

      <div className="mb-6">
        <label htmlFor="exercise" className="block text-sm font-medium mb-2">
          Select Exercise:
        </label>
        <select
          id="exercise"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="border rounded p-2 w-full max-w-xs"
        >
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[400px]">
        <Line options={options} data={chartData} />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Weight</th>
                <th className="px-4 py-2">Sets</th>
                <th className="px-4 py-2">Reps</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.slice(-5).map((log, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    {format(parseISO(log.date), "MM/dd/yyyy")}
                  </td>
                  <td className="px-4 py-2">{log.weight} lbs</td>
                  <td className="px-4 py-2">{log.sets}</td>
                  <td className="px-4 py-2">{log.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
