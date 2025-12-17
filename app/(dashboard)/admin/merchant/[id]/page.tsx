"use client";
import React, { useEffect, useState, use } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { toast } from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  price: number;
  inStock: number;
}

interface Merchant {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  status: string;
  products: Product[];
}

interface MerchantDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function MerchantDetailPage({
  params,
}: MerchantDetailPageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    status: "ACTIVE",
  });

  const router = useRouter();

  const fetchMerchant = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/merchants/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          router.push("/admin/merchant");
          return;
        }
        throw new Error("Falha ao buscar lojista");
      }
      
      const data = await response.json();
      setMerchant(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        description: data.description || "",
        status: data.status || "ACTIVE",
      });
    } catch (error) {
      console.error("Erro ao buscar lojista:", error);
      toast.error("Falha ao carregar detalhes do lojista");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchant();
  }, [id]); 

const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // This is the correct way to use apiClient.put
    // It should just take the URL and the data object
    const response = await apiClient.put(`/api/merchants/${id}`, formData);

    if (!response.ok) {
      throw new Error("Falha ao atualizar o lojista");
    }

    toast.success("Lojista atualizado com sucesso");
    fetchMerchant(); // Refresh data
  } catch (error) {
    console.error("Erro ao atualizar lojista:", error);
    toast.error("Falha ao atualizar lojista");
  }
};

  const handleDelete = async () => {
    if (!confirm("Tem certeza de que deseja excluir este lojista?")) {
      return;
    }
    
    try {
      const response = await apiClient.delete(`/api/merchants/${id}`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Falha ao excluir lojista");
      }
      
      toast.success("Lojista excluído com sucesso");
      router.push("/admin/merchant");
    } catch (error) {
      console.error("Erro ao excluir lojista:", error);
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Falha ao excluir lojista"
          : "Falha ao excluir lojista"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 flex items-center justify-center">
          Carregando detalhes do lojista...
        </div>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 flex items-center justify-center">
          Lojista não encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Detalhes do lojista</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/merchant"
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Voltar para lojistas
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
              Excluir lojista
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="ACTIVE">Ativo</option>
                <option value="INACTIVE">Inativo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Produtos do lojista</h2>
          {merchant.products.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Título</th>
                  <th className="py-3 text-left">Preço</th>
                  <th className="py-3 text-left">Em estoque</th>
                  <th className="py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {merchant.products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{product.title}</td>
                    <td className="py-4">${product.price / 100}</td>
                  <td className="py-4">{product.inStock}</td>
                  <td className="py-4">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-orange-500 hover:underline"
                    >
                        Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p className="text-gray-500">Ainda não há produtos para este lojista.</p>
          )}
        </div>
      </div>
    </div>
  );
}
