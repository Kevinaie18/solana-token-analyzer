import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CSVUploader from './components/CSVUploader'
import ParameterForm from './components/ParameterForm'
import ResultTable from './components/ResultTable'
import WhaleReport from './components/WhaleReport'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import NotFound from './components/NotFound'
import { useTokenAnalysis } from './hooks/useTokenAnalysis'
import DownloadButton from './components/DownloadButton'
import { downloadCSV } from './utils/csvExport'
import './App.css'

function Home() {
  const [csvFile, setCsvFile] = useState(null)
  const { isLoading, error, results, analyzeData } = useTokenAnalysis()

  const handleFileAccepted = (file) => {
    setCsvFile(file)
  }

  const handleParametersSubmit = async (parameters) => {
    if (!csvFile) {
      alert('Please upload a CSV file first')
      return
    }
    await analyzeData(csvFile, parameters)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Solana Token Transaction Analyzer
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload CSV</h2>
            <CSVUploader onFileAccepted={handleFileAccepted} />
          </div>

          {csvFile && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Parameters</h2>
              <ParameterForm onSubmit={handleParametersSubmit} />
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} />}

          {results && !isLoading && !error && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Transaction Data</h2>
                  <DownloadButton onClick={() => downloadCSV(results.cleaned_data, 'transaction_data')}>
                    Download CSV
                  </DownloadButton>
                </div>
                <ResultTable data={results.cleaned_data} />
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Whale Wallet Analysis</h2>
                  <DownloadButton onClick={() => downloadCSV(results.whale_analysis, 'whale_analysis')}>
                    Download CSV
                  </DownloadButton>
                </div>
                <WhaleReport data={results.whale_analysis} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
