import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './ProjectDashboard.css';

const chartData = [
  {
    year: '2023',
    'Web Server': 12.5,
    'Cloud & DevOps': 0,
    'AI Service': 0,
  },
  {
    year: '2024',
    'Web Server': 50,
    'Cloud & DevOps': 25,
    'AI Service': 12.5,
  },
  {
    year: '2025',
    'Web Server': 75,
    'Cloud & DevOps': 62.5,
    'AI Service': 50,
  },
  {
    year: '2026',
    'Web Server': 87.5,
    'Cloud & DevOps': 100,
    'AI Service': 87.5,
  }
];

const keywords = [
  "웹서버 개발",
  "클라우드 운영",
  "안정성 및 비용 절감",
  "AI & PoC"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`${label}년 핵심 역량`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '4px 0', fontSize: '0.9rem', fontWeight: 600 }}>
            {`${entry.name} : ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProjectDashboard = () => {
  return (
    <div className="project-dashboard">
      <div className="dashboard-header">
        <p className="dashboard-subtitle">연도별 주요 포커스 및 대표 역량</p>
      </div>

      <div className="dashboard-content">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#8892b0" tick={{ fill: '#8892b0' }} />
              <YAxis stroke="#8892b0" tick={{ fill: '#8892b0' }} domain={[0, 100]} hide />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="Web Server" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#3b82f6' }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="Cloud & DevOps" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#10b981' }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="AI Service" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#8b5cf6' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="keywords-container">
          <h4 className="keywords-title">Core Competencies</h4>
          <div className="keywords-grid">
            {keywords.map((word, idx) => (
              <div key={idx} className="keyword-badge">
                <span className="keyword-dot"></span>
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
