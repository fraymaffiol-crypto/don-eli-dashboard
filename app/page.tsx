'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DonEliDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [sellers, setSellers] = useState<any[]>([])
  const [selectedSellerId, setSelectedSellerId] = useState('')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [manualPrice, setManualPrice] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: p } = await supabase.from('products').select('*')
    const { data: s } = await supabase.from('sales').select('*').order('created_at', { ascending: false })
    const { data: sl } = await supabase.from('profiles').select('*')
    
    if (p) setProducts(p)
    if (s) setSales(s)
    if (sl) setSellers(sl)
  }

  async function registrarVenta(e: any) {
    e.preventDefault()
    const product = products.find(p => p.id === selectedProductId)
    const seller = sellers.find(s => s.id === selectedSellerId)

    if (!product || !seller) {
      alert("Selecciona vendedor y producto")
      return
    }

    const { error } = await supabase.from('sales').insert([{
      seller_name: seller.full_name,
      seller_id: seller.id,
      product_id: product.id,
      product_name: product.name,
      quantity: 1,
      unit_price: parseFloat(manualPrice),
      total_price: parseFloat(manualPrice)
    }])

    if (!error) {
      alert("¡Venta registrada con éxito!")
      setManualPrice('')
      setSelectedProductId('')
      fetchData()
    } else {
      alert("Error: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <h1 className="text-4xl font-serif text-[#c6a87d] mb-8 border-b border-[#c6a87d] pb-4">Don Eli Café - Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#141414] p-6 rounded-lg border border-[#c6a87d]/30">
          <h2 className="text-xl text-[#c6a87d] mb-4 uppercase tracking-widest">Nueva Venta</h2>
          <form onSubmit={registrarVenta} className="space-y-4">
            
            {/* SELECT DE VENDEDORES */}
            <select 
              className="w-full bg-black border border-gray-700 p-2 rounded focus:border-[#c6a87d] outline-none"
              value={selectedSellerId}
              onChange={(e) => setSelectedSellerId(e.target.value)}
              required
            >
              <option value="">¿Quién vende?</option>
              {sellers.map(s => (
                <option key={s.id} value={s.id}>{s.full_name}</option>
              ))}
            </select>
            
            {/* SELECT DE PRODUCTOS CON STOCK */}
            <select 
              className="w-full bg-black border border-gray-700 p-2 rounded focus:border-[#c6a87d] outline-none"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              required
            >
              <option value="">Selecciona Producto</option>
              {products.map(p => (
                <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                  {p.name} — Stock: {p.stock} {p.stock <= 0 ? '(AGOTADO)' : ''}
                </option>
              ))}
            </select>

            <input 
              type="number"
              step="0.01"
              className="w-full bg-black border border-gray-700 p-2 rounded text-[#c6a87d] font-bold text-lg focus:border-[#c6a87d] outline-none" 
              placeholder="Precio Final de Venta ($)" 
              value={manualPrice}
              onChange={(e) => setManualPrice(e.target.value)}
              required 
            />

            <button className="w-full bg-[#c6a87d] text-black font-bold py-3 rounded hover:bg-[#a88e66] transition uppercase tracking-widest">
              Registrar Venta
            </button>
          </form>
        </div>

        <div className="bg-[#141414] p-6 rounded-lg border border-[#c6a87d]/30 overflow-auto">
          <h2 className="text-xl text-[#c6a87d] mb-4 uppercase tracking-widest">Últimas Ventas</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[#c6a87d] border-b border-gray-800">
                <th className="pb-2">Vendedor</th>
                <th className="pb-2">Producto</th>
                <th className="pb-2 text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id} className="border-b border-gray-900">
                  <td className="py-2 font-bold">{s.seller_name}</td>
                  <td className="py-2">{s.product_name}</td>
                  <td className="py-2 text-right text-[#c6a87d] font-bold">${s.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}