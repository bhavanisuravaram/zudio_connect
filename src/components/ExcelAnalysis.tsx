import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, BarChart3, Download, Trash2, Eye, TrendingUp, PieChart, LineChart, ScatterChart as Scatter } from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Scatter as ScatterChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ExcelData {
  filename: string;
  data: any[];
  columns: string[];
  uploadedAt: Date;
}

interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  xAxis: string;
  yAxis: string;
  title: string;
}

const ExcelAnalysis: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ExcelData[]>([]);
  const [selectedFile, setSelectedFile] = useState<ExcelData | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: 'Chart Title'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      const columns = Object.keys(jsonData[0] || {});
      
      const newFile: ExcelData = {
        filename: file.name,
        data: jsonData,
        columns,
        uploadedAt: new Date()
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      setSelectedFile(newFile);
      
      // Set default chart config
      if (columns.length >= 2) {
        setChartConfig(prev => ({
          ...prev,
          xAxis: columns[0],
          yAxis: columns[1],
          title: `${columns[1]} by ${columns[0]}`
        }));
      }
    } catch (error) {
      console.error('Error parsing Excel file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const generateChartData = () => {
    if (!selectedFile || !chartConfig.xAxis || !chartConfig.yAxis) return null;

    const data = selectedFile.data;
    const labels = data.map(row => row[chartConfig.xAxis]);
    const values = data.map(row => parseFloat(row[chartConfig.yAxis]) || 0);

    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(168, 85, 247, 0.8)'
    ];

    switch (chartConfig.type) {
      case 'pie':
        return {
          labels,
          datasets: [{
            data: values,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.8', '1')),
            borderWidth: 2
          }]
        };
      case 'scatter':
        return {
          datasets: [{
            label: chartConfig.title,
            data: data.map(row => ({
              x: parseFloat(row[chartConfig.xAxis]) || 0,
              y: parseFloat(row[chartConfig.yAxis]) || 0
            })),
            backgroundColor: colors[0],
            borderColor: colors[0].replace('0.8', '1'),
          }]
        };
      default:
        return {
          labels,
          datasets: [{
            label: chartConfig.yAxis,
            data: values,
            backgroundColor: colors[0],
            borderColor: colors[0].replace('0.8', '1'),
            borderWidth: 2,
            fill: chartConfig.type === 'line' ? false : true
          }]
        };
    }
  };

  const renderChart = () => {
    const chartData = generateChartData();
    if (!chartData) return null;

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: chartConfig.title,
        },
      },
    };

    switch (chartConfig.type) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'scatter':
        return <ScatterChart data={chartData} options={options} />;
      default:
        return null;
    }
  };

  const chartTypes = [
    { type: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { type: 'line', label: 'Line Chart', icon: LineChart },
    { type: 'pie', label: 'Pie Chart', icon: PieChart },
    { type: 'scatter', label: 'Scatter Plot', icon: Scatter }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Excel Data Analysis</h1>
        <p className="text-green-100 text-lg">
          Upload Excel files and generate interactive visualizations with AI-powered insights
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* File Upload & Management */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">File Management</h2>
          
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload Excel file</p>
            <p className="text-sm text-gray-500">Supports .xlsx and .xls formats</p>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Processing file...</span>
            </div>
          )}

          {/* Uploaded Files List */}
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFile?.filename === file.filename
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedFile(file)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{file.filename}</p>
                      <p className="text-xs text-gray-500">
                        {file.data.length} rows, {file.columns.length} columns
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chart Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Chart Configuration</h2>
          
          {selectedFile ? (
            <div className="space-y-6">
              {/* Chart Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Chart Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypes.map((chart) => (
                    <button
                      key={chart.type}
                      onClick={() => setChartConfig(prev => ({ ...prev, type: chart.type as any }))}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        chartConfig.type === chart.type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <chart.icon className="w-4 h-4 mx-auto mb-1" />
                      {chart.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Axis Selection */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
                  <select
                    value={chartConfig.xAxis}
                    onChange={(e) => setChartConfig(prev => ({ ...prev, xAxis: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select column</option>
                    {selectedFile.columns.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
                  <select
                    value={chartConfig.yAxis}
                    onChange={(e) => setChartConfig(prev => ({ ...prev, yAxis: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select column</option>
                    {selectedFile.columns.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chart Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
                <input
                  type="text"
                  value={chartConfig.title}
                  onChange={(e) => setChartConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter chart title"
                />
              </div>

              {/* Generate Chart Button */}
              <button
                onClick={() => setShowChart(true)}
                disabled={!chartConfig.xAxis || !chartConfig.yAxis}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                Generate Chart
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a file to configure chart</p>
            </div>
          )}
        </motion.div>

        {/* Chart Display */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Chart Preview</h2>
            {showChart && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>

          <div className="h-80">
            {showChart && selectedFile && chartConfig.xAxis && chartConfig.yAxis ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                {renderChart()}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Configure and generate your chart</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExcelAnalysis;