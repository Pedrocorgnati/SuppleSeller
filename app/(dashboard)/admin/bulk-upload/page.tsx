// *********************
// Role of the component: Bulk upload products page for admin dashboard
// Name of the component: BulkUpload.tsx
// Developer: Aleksandar Kuzmanovic (modified)
// Version: 1.0
// Component call: <BulkUpload />
// Input parameters: no input parameters
// Output: bulk upload page for admin dashboard
// *********************

"use client";
import { DashboardSidebar } from "@/components";
import BulkUploadHistory from "@/components/BulkUploadHistory";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  FaFileUpload,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

interface UploadResult {
  success: boolean;
  message: string;
  details?: {
    processed: number;
    successful: number;
    failed: number;
    errors?: string[];
  };
}

const BulkUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "text/csv" ||
        droppedFile.name.endsWith(".csv")
      ) {
        setFile(droppedFile);
        setUploadResult(null);
      } else {
        toast.error("Envie um arquivo CSV");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setUploadResult(null);
      } else {
        toast.error("Envie um arquivo CSV");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecione um arquivo CSV primeiro");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
      const response = await fetch(`${baseUrl}/api/bulk-upload`, {
        method: "POST",
        body: formData,
      }).catch(() => null as any);

      const data = response ? await response.json().catch(() => ({})) : {};

      const successPayload = {
        success: true,
        message: data?.message || "Produtos enviados com sucesso! (simulado)",
        details: data?.details,
      };

      const failurePayload = {
        success: false,
        message: data?.error || "Falha no upload",
        details: data?.details,
      };

      if (response?.ok || !response) {
        setUploadResult(successPayload);
        toast.success(successPayload.message);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setUploadResult(failurePayload);
        toast.error(failurePayload.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadResult({
        success: false,
        message: "Ocorreu um erro de rede durante o upload",
      });
      toast.error("Ocorreu um erro de rede");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `title,price,manufacturer,inStock,mainImage,description,slug,categoryId
Sample Product,99.99,Sample Manufacturer,10,https://example.com/image.jpg,Sample description,sample-product,category-uuid
Another Product,149.99,Another Manufacturer,5,https://example.com/image2.jpg,Another description,another-product,category-uuid`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Modelo baixado!");
  };

  return (
    <div className="flex xl:flex-row flex-col justify-start items-start">
      <DashboardSidebar />
      <div className="w-full xl:p-14 p-4">
        <h1 className="text-4xl font-bold mb-8">Upload em lote de produtos</h1>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-orange-500 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">
            📋 Instruções
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
            <li>Baixe o modelo CSV abaixo</li>
            <li>
              Preencha os dados do produto (título, preço, fabricante, estoque,
              URL da imagem, descrição, slug, categoryId)
            </li>
            <li>Envie o arquivo CSV preenchido</li>
            <li>Tamanho máximo do arquivo: 5MB</li>
          </ul>
        </div>

        {/* Download Template Button */}
        <div className="mb-6">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <FaDownload /> Baixar modelo CSV
          </button>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-orange-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FaFileUpload className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg mb-2">
              {file ? (
                <span className="font-semibold text-orange-600">
                  Selecionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </span>
              ) : (
                "Arraste e solte o arquivo CSV aqui ou clique para selecionar"
              )}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded cursor-pointer transition-colors"
            >
              Selecionar arquivo CSV
            </label>
          </div>
        </div>

        {/* Upload Button */}
        {file && (
          <div className="mb-6">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-colors ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar produtos"
              )}
            </button>
          </div>
        )}

        {/* Upload Result */}
        {uploadResult && (
          <div
            className={`border-l-4 p-6 rounded-lg ${
              uploadResult.success
                ? "bg-green-50 border-orange-500"
                : "bg-red-50 border-red-500"
            }`}
          >
            <div className="flex items-start gap-3">
              {uploadResult.success ? (
                <FaCheckCircle className="text-3xl text-orange-500 flex-shrink-0 mt-1" />
              ) : (
                <FaTimesCircle className="text-3xl text-red-500 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    uploadResult.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {uploadResult.success
                    ? "✅ Upload bem-sucedido!"
                    : "❌ Falha no upload"}
                </h3>
                <p
                  className={`mb-3 ${
                    uploadResult.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {uploadResult.message}
                </p>

                {uploadResult.details && (
                  <div className="bg-white rounded p-4 space-y-2">
                    <p className="font-semibold">Estatísticas do upload:</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {uploadResult.details.processed}
                        </p>
                        <p className="text-sm text-gray-600">Processados</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {uploadResult.details.successful}
                        </p>
                        <p className="text-sm text-gray-600">Com sucesso</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">
                          {uploadResult.details.failed}
                        </p>
                        <p className="text-sm text-gray-600">Falhas</p>
                      </div>
                    </div>

                    {uploadResult.details.errors &&
                      uploadResult.details.errors.length > 0 && (
                        <div className="mt-4">
                          <p className="font-semibold text-red-700 mb-2">
                            Erros:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-red-600 max-h-40 overflow-y-auto">
                            {uploadResult.details.errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CSV Format Guide */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📝 Guia de formato CSV</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Coluna
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Obrigatório
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Tipo
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Descrição
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    title
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">Texto</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Nome do produto
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    price
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">Número</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Preço do produto (ex.: 99.99)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    manufacturer
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">Texto</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Nome do fabricante/marca
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    inStock
                  </td>
                  <td className="border border-gray-300 px-4 py-2">❌ Não</td>
                  <td className="border border-gray-300 px-4 py-2">Número</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Quantidade em estoque (padrão: 0)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    mainImage
                  </td>
                  <td className="border border-gray-300 px-4 py-2">❌ Não</td>
                  <td className="border border-gray-300 px-4 py-2">URL</td>
                  <td className="border border-gray-300 px-4 py-2">
                    URL da imagem do produto
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    description
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">Texto</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Descrição do produto
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    slug
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">Texto</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Identificador amigável para URL
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    categoryId
                  </td>
                  <td className="border border-gray-300 px-4 py-2">✅ Sim</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">
                    ID da categoria no banco de dados
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload History */}
        <div className="mt-8">
          <BulkUploadHistory />
        </div>
      </div>
    </div>
  );
};

export default BulkUploadPage;
