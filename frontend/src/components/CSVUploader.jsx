import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CSVUploader = ({ onFileAccepted }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'text/csv') {
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the CSV file here...</p>
      ) : (
        <div>
          <p className="text-gray-600">Drag and drop a CSV file here, or click to select</p>
          <p className="text-sm text-gray-500 mt-2">Only CSV files are accepted</p>
        </div>
      )}
    </div>
  );
};

export default CSVUploader; 