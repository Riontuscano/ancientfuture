import React, { useState } from 'react';
import { FileText, ChevronRight, PanelLeftClose } from 'lucide-react';
import Chatbot from './chatbot';

const PDFLayout = ({mode}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const pdfList = [
    { id: 1, name: 'Lecture 1.pdf', url: '/pdfs/Day1.pdf' },
    { id: 2, name: 'Lecture 2.pdf', url: '/pdfs/Day2.pdf' },
    { id: 3, name: 'Lecture 3.pdf', url: '/pdfs/Day3.pdf' },
    { id: 4, name: 'Lecture 4.pdf', url: '/pdfs/Day4.pdf' },
    { id: 5, name: 'Lecture 5.pdf', url: '/pdfs/Day6.pdf' },
    { id: 6, name: 'Lecture 6.pdf', url: '/pdfs/Day7.pdf' },
    { id: 7, name: 'Lecture 7.pdf', url: '/pdfs/Day8.pdf' },
    { id: 8, name: 'Lecture 8.pdf', url: '/pdfs/Day9.pdf' },
  ];

  return (
    <>
      <Chatbot mode={mode} groqApiKey ={apiUrl} />
      <div className="fixed inset-0 mt-16 flex">
        <div
          className={`${!mode ? 'bg-gray-50 border-r border-gray-200':'bg-gray-900 border-r border-gray-900'} transition-all duration-300 ${
            isSidebarOpen ? 'w-72' : 'w-0'
          } overflow-hidden flex flex-col h-screen`}
        >
          <div className={`p-4 border-b ${!mode ? 'border-gray-300':'border-gray-600'} flex justify-between items-center`}>
          <h2 className={`text-xl font-semibold ${!mode ? 'text-gray-700':'text-gray-400'}`}>Documents</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <PanelLeftClose className={`w-5 h-5 ${mode ? 'text-gray-300': 'text-gray-700'} font-medium`}/>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {pdfList.map((pdf) => (
                <button
                  key={pdf.id}
                  onClick={() => setSelectedPDF(pdf)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedPDF?.id === pdf.id
                      ? `bg-purple-100 text-purple-700 font-medium`
                      : `${!mode ? 'hover:bg-gray-200 hover:text-gray-700' : 'hover:bg-gray-800 hover:text-gray-300'}`
                  } flex items-center gap-3`}
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{pdf.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`fixed left-4 top-20 z-10 ${!mode ? 'bg-gray-800':'bg-white'} p-2 border rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
          >
            <ChevronRight className={`w-5 h-5 ${mode ? 'text-gray-800':'text-gray-200'} font-medium`}/>
          </button>
        )}

        <div className = {`flex-1 ${mode ? 'bg-gray-800' : 'bg-gray-100'} h-screen overflow-hidden`}>
          {selectedPDF ? (
            <div className="h-full flex flex-col p-6">
              <div className={`${mode ? 'bg-gray-900': 'bg-white'} rounded-lg shadow-sm p-4 mb-4`}>
                <h1 className={`text-xl font-semibold ${mode ? 'text-gray-400' : 'text-gray-800'}`}>
                  {selectedPDF.name}
                </h1>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                <iframe
                  src={selectedPDF.url}
                  className="w-full h-full"
                  title={selectedPDF.name}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 flex-col gap-4">
              <FileText className="w-16 h-16 text-gray-400" />
              <p className="text-lg">Select a document to view</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PDFLayout;
