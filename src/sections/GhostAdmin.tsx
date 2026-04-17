import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Lock, 
  Plus, 
  Edit2, 
  Trash2,
  LogOut,
  AlertTriangle,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

// Ghost Admin Access Modal
export function AdminAccessModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState('');
  const { attemptAdminAccess, isLocked, lockTimeRemaining } = useApp();
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLocked) return;
    
    const success = attemptAdminAccess(password);
    if (success) {
      setPassword('');
      onSuccess();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="bg-black border border-white/20 rounded-none p-12 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {isLocked ? (
              <AlertTriangle className="w-10 h-10 text-red-500" />
            ) : (
              <Lock className="w-10 h-10 text-aria-pink" />
            )}
          </div>
          <h2 className="font-display font-bold text-2xl text-white tracking-widest uppercase mb-3">
            Aria System Access
          </h2>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
            {isLocked 
              ? `Terminal Locked: ${lockTimeRemaining}s`
              : 'Secure Authentication Required'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSCODE"
              className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder:text-white/20 focus:border-aria-pink focus:ring-0 text-center tracking-[0.5em] h-12"
              disabled={isLocked}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-label tracking-widest">{error}</p>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              className="w-full bg-aria-pink hover:bg-aria-pink/90 text-white rounded-none h-12 font-bold tracking-widest uppercase"
              disabled={isLocked}
            >
              Authorize
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors py-2"
            >
              Cancel Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Product Modal for Add/Edit
function ProductModal({ 
  isOpen, 
  onClose, 
  product 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  product?: Product | null;
}) {
  const { addProduct, updateProduct } = useApp();
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    category: 'beginner',
    image: '',
    sellerUrl: '',
    whatsIncluded: [],
    outcomes: []
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: 'beginner',
        image: '',
        sellerUrl: '',
        whatsIncluded: [],
        outcomes: []
      });
    }
  }, [product, isOpen]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct(product.id, formData);
    } else {
      addProduct(formData as Omit<Product, 'id' | 'rating' | 'reviews'>);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500 overflow-y-auto pt-20 pb-10">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-5xl w-full mx-4 relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              {product ? 'Synchronize Asset' : 'Register New Asset'}
            </h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
              Aria Command • Core Interface
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-100 shadow-sm"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Visual Asset</label>
              <div 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`group relative aspect-square rounded-[1.5rem] border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
                  isDragging 
                    ? 'border-aria-pink bg-aria-pink/5' 
                    : formData.image 
                      ? 'border-transparent' 
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                }`}
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs font-bold uppercase tracking-widest">Replace Identification</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-900 text-sm font-bold mb-1">Upload Identification</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest leading-relaxed">Drag & drop or click to choose from system library</p>
                  </>
                )}
                <input 
                  type="file" 
                  onChange={onFileSelect}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Classification Hub</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 h-14 px-5 text-sm font-bold focus:border-aria-pink focus:outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="beginner">Core Beginner</option>
                <option value="advanced">Matrix Advanced</option>
                <option value="advertising">Ad Stream</option>
                <option value="social">Social Network</option>
                <option value="toolkit">System Toolkit</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Asset Designation</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 h-14 px-5 text-sm font-bold focus:border-aria-pink focus:ring-0 placeholder:text-gray-300"
                  placeholder="IDENTIFY ASSET..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Terminal Value (USD)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 h-14 px-5 text-sm font-bold focus:border-aria-pink focus:ring-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Redirect Access Terminal</label>
              <Input
                value={formData.sellerUrl}
                onChange={(e) => setFormData({ ...formData, sellerUrl: e.target.value })}
                className="bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 h-14 px-5 text-sm font-bold focus:border-aria-pink focus:ring-0 placeholder:text-gray-300"
                placeholder="HTTPS://ARIA-SYSTEM.REDIRECT/ACCESS"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-900 text-xs font-bold uppercase tracking-widest block pl-1">Capabilities Summary</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] text-gray-900 p-6 text-sm font-medium focus:border-aria-pink focus:outline-none min-h-[160px] transition-all placeholder:text-gray-300"
                placeholder="DEFINE ASSET PARAMETERS AND INTELLIGENCE SUMMARY..."
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-aria-pink text-white rounded-2xl h-16 font-bold tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-aria-pink/20"
              >
                {product ? 'Apply Synchronization' : 'Initialize Asset Entry'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Ghost Admin Panel
export function GhostAdmin() {
  const { 
    products, 
    deleteProduct, 
    logoutAdmin,
    user,
    updateLastActivity,
    totalClicks,
    affiliateStats
  } = useApp();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    updateLastActivity();
  }, []);

  const handleActivity = () => {
    updateLastActivity();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const totalSales = 0;

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
    handleActivity();
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen w-full bg-[#F5F7FA] pb-16"
      onClick={handleActivity}
      onKeyDown={handleActivity}
    >
      {/* Top Navigation / Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center p-2 shadow-lg shadow-black/10">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-none">Aria Command</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Admin Terminal 2.0</p>
            </div>
          </div>

          <div className="flex-grow max-w-2xl hidden md:flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                type="text"
                placeholder="Search matrix assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:bg-white focus:border-aria-pink transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="h-11 px-4 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-gray-200 hover:text-gray-900 transition-all flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Filters
              </button>
              <Button 
                onClick={handleCreate}
                className="h-11 px-6 bg-[#FF4F00] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-orange-500/10"
              >
                Apply New
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-gray-100">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Active</span>
            </div>
            <button
              onClick={logoutAdmin}
              className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-xl transition-all border border-gray-100"
              title="Terminate Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-10">
        {/* Bento Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Featured Stats */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Total Revenue</p>
              <div className="text-4xl font-bold text-gray-900 tabular-nums group-hover:text-aria-pink transition-colors">
                ${totalSales.toLocaleString()}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-bold text-green-500 py-1 px-2 bg-green-50 rounded-lg">+14.2%</span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Growth Index</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Active Assets</p>
              <div className="text-4xl font-bold text-gray-900 tabular-nums group-hover:text-blue-500 transition-colors">
                {products.length}
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-bold text-blue-500 py-1 px-2 bg-blue-50 rounded-lg uppercase tracking-tight">Synchronized</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">On-Grid Units</p>
              <div className="text-4xl font-bold text-gray-900 tabular-nums group-hover:text-orange-500 transition-colors">
                {user ? '04' : '01'}
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-bold text-orange-500 py-1 px-2 bg-orange-50 rounded-lg uppercase tracking-tight">Verified</span>
              </div>
            </div>

            {/* Sub-grid Featured Card */}
            <div className="sm:col-span-3 bg-gray-900 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-black/10">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
               <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-6">Featured Core Protocol</span>
                  <h3 className="text-3xl font-bold text-white mb-4 max-w-lg leading-tight">Mastering High-Frequency Digital Arbitrage</h3>
                  <p className="text-white/40 text-sm font-medium mb-8 max-w-md">Synchronize your intelligence with the latest market trends and high-converting asset matrix strategies.</p>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-xs transition-all hover:px-12">
                    Access Intelligence
                  </Button>
               </div>
               <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-aria-pink/20 rounded-full blur-[100px] group-hover:bg-aria-pink/30 transition-all duration-700" />
            </div>
          </div>

          {/* Side List Top Earners */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Top Matrix Earners</h3>
               <button className="text-gray-300 hover:text-gray-900 transition-colors">
                 <ChevronRight className="w-5 h-5" />
               </button>
             </div>
             <div className="space-y-6">
               {[].map((earner, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                       {earner.name[0]}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900">{earner.name}</p>
                       <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{earner.id}</p>
                     </div>
                   </div>
                   <div className="text-sm font-bold text-gray-900">{earner.earnings}</div>
                 </div>
               ))}
             </div>
             <div className="mt-10 pt-8 border-t border-gray-50">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Affiliate Stats</p>
                   <p className="text-lg font-bold text-gray-900">${affiliateStats.toFixed(2)}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Total Clicks</p>
                   <p className="text-lg font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Matrix Assets Management Hub */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row gap-8 justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Intelligence Matrix</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Managing {products.length} registered core assets</p>
            </div>
            <div className="flex items-center gap-3">
               <Button 
                onClick={handleCreate}
                className="bg-gray-900 hover:bg-black text-white rounded-xl px-6 h-12 font-bold uppercase tracking-widest text-[10px] transition-all flex items-center gap-3"
               >
                 <Plus className="w-4 h-4" />
                 Initialize Asset
               </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left p-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Identification Card</th>
                  <th className="text-left p-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hidden sm:table-cell">Terminal Value / Matrix</th>
                  <th className="text-left p-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hidden md:table-cell">Classification</th>
                  <th className="text-right p-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Synchronization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product: Product) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 relative shadow-sm">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <div className="text-gray-900 text-base font-bold tracking-tight mb-1 group-hover:text-aria-pink transition-colors">
                            {product.title}
                          </div>
                          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            ID: {product.id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 hidden sm:table-cell">
                      <div className="text-gray-900 text-lg font-bold font-mono">${product.price}</div>
                      <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Digital Unit Value</div>
                    </td>
                    <td className="p-8 hidden md:table-cell">
                      <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-gray-500 text-[10px] font-bold uppercase tracking-widest shadow-sm group-hover:border-aria-pink group-hover:text-aria-pink transition-all">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 hover:bg-black hover:text-white transition-all border border-gray-100"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-10 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Monitoring {filteredProducts.length} intelligence nodes</span>
            <div className="flex gap-4">
              <button disabled className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">Prev Protocol</button>
              <button disabled className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">Next Protocol</button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full mx-4 shadow-2xl border border-gray-100 text-center scale-up-animation">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-100">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Terminate Asset?</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10">
                Proceeding with termination will permanently remove this asset from the intelligence matrix.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl h-14 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-500/20"
                >
                  Confirm Termination
                </Button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="w-full h-14 text-gray-400 hover:text-gray-900 font-bold uppercase tracking-widest text-[10px] transition-colors"
                >
                  Abort Protocol
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Modal */}
        <ProductModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={editingProduct}
        />
      </div>
    </div>
  );
}
