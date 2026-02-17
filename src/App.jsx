import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Package, LayoutDashboard, Trash2, Plus, Wifi, WifiOff, 
  Settings, LogOut, User, Bell, Shield, Moon, Globe, Database, 
  CreditCard, Truck, Users, BarChart3, Camera, Search, ChevronRight, Sun
} from 'lucide-react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXTS } from "./texts"; // texts.js shu papkada bo‘lishi kerak


// --- 1. FON (DOIMIY) ---
const SpaceBackground = ({ isDark }) => (
  <div className={`fixed inset-0 z-[-1] ${isDark ? 'bg-[#020617]' : 'bg-slate-200'} transition-colors duration-500 overflow-hidden`}>
    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    {isDark && (
      <>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </>
    )}
  </div>
);

// --- 2. LOGIN EKRANI ---
const LoginScreen = ({ handleLogin, loginData, setLoginData, language, setLanguage }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <SpaceBackground isDark={true} />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-md p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
      
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Shield size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">CORE POS</h2>
        <p className="text-slate-400 text-sm mt-2 font-bold italic">Koinot Boshqaruv Markazi</p>
      </div>

      {/* Til tanlash */}
      

      <form onSubmit={handleLogin} className="space-y-6">
        <input type="text" placeholder="Xodim ID" value={loginData.id} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-500" onChange={e => setLoginData({...loginData, id: e.target.value})} />
        <input type="password" placeholder="Parol" value={loginData.password} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-cyan-500" onChange={e => setLoginData({...loginData, password: e.target.value})} />
        <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-cyan-900/40">KIRISH</button>
      </form>
    </motion.div>
  </div>
);

// --- 3. ASOSIY ILOVA ---
const INITIAL_PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro", price: 1200, stock: 8, category: "Telefon", image: "https://picsum.photos/400/400?random=1" },
  { id: 2, name: "Macbook Air M2", price: 1100, stock: 5, category: "Laptop", image: "https://picsum.photos/400/400?random=2" },
  { id: 3, name: "AirPods Max", price: 550, stock: 12, category: "Aksessuar", image: "https://picsum.photos/400/400?random=3" },
];

const App = () => {






const [language, setLanguage] = useState('UZ'); // default O'zbekcha

const handleLogin = (e) => {
  e.preventDefault();
  if (loginData.id === 'admin' && loginData.password === '1234') {
    setIsLoggedIn(true);
    toast.success(TEXTS[language].toast.loginSuccess);
  } else { 
    toast.error(TEXTS[language].toast.loginFail); 
  }
};





  const [showProfile, setShowProfile] = useState(false);

const [showForm, setShowForm] = useState(false);
const [form, setForm] = useState({
  name: "",
  price: "",
  stock: "",
  color: "",
  image: "",
});








  const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLogged')) || false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('pos');
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deliveries, setDeliveries] = useState([]);


const createDelivery = (product, quantity, destination) => {
  const newDelivery = {
    id: Date.now(),
    product,
    quantity,
    destination,
    status: "Pending",
    createdAt: new Date().toLocaleString()
  };

  setDeliveries(prev => [...prev, newDelivery]);
};
const updateDeliveryStatus = (id, newStatus) => {
  setDeliveries(prev =>
    prev.map(delivery =>
      delivery.id === id
        ? { ...delivery, status: newStatus }
        : delivery
    )
  );
};




  // Sozlamalar uchun State'lar
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products_v3')) || INITIAL_PRODUCTS);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart_v3')) || []);

  useEffect(() => {
    localStorage.setItem('products_v3', JSON.stringify(products));
    localStorage.setItem('cart_v3', JSON.stringify(cart));
    localStorage.setItem('isLogged', JSON.stringify(isLoggedIn));
  }, [products, cart, isLoggedIn]);

 

  const addToCart = (product) => {
    if (product.stock <= 0) return toast.error("Omborda qolmagan!");
    setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success(`${product.name} savatda!`);
  };

  const removeFromCart = (id) => {
    const item = cart.find(c => c.id === id);
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock + item.qty } : p));
    setCart(cart.filter(c => c.id !== id));
  };

  if (!isLoggedIn) return <LoginScreen handleLogin={handleLogin} loginData={loginData} setLoginData={setLoginData} />;


  const loginHandler = (e) => {
    e.preventDefault();
    if (loginData.id === 'admin' && loginData.password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Login failed');
    }
  };

  // --- LOGIN SCREEN ---
 
const POS = () => (
  <div className="p-8 rounded-2xl bg-white/5 text-slate-100">
    <h2 className="text-2xl font-bold">POS sahifasi</h2>
    <p>Bu yerga kassaga oid kontent qo‘yiladi.</p>
  </div>
);

const Logistics = ({ language }) => {
  const [deliveries, setDeliveries] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setDeliveries([
        { id: 1, courier: 'Ali', destination: 'Toshkent', status: 'Pending' },
        { id: 2, courier: 'Vali', destination: 'Samarqand', status: 'Delivered' },
      ]);
    }, 1000);
  }, []);

    return (
    <div className="p-8 bg-white/5 text-slate-100 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        {language === 'UZ' ? 'Logistika' : language === 'EN' ? 'Logistics' : 'Логистика'}
      </h2>
      <p className="mb-6">Yetkazish va kuryerlar haqida ma'lumot shu yerda bo‘ladi.</p>

      {deliveries.length === 0 ? (
        <p className="opacity-50">Ma'lumot yuklanmoqda...</p>
      ) : (
        <div className="space-y-4">
          {deliveries.map(d => (
            <div key={d.id} className="p-4 bg-slate-700 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold">{d.courier}</p>
                <p className="text-sm opacity-70">{d.destination}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                d.status === 'Delivered' ? 'bg-green-500/30 text-green-500' : 'bg-yellow-500/30 text-yellow-400'
              }`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


  
  return (
    <div className={`min-h-screen ${isDark ? 'text-slate-100' : 'text-slate-900'} font-sans transition-colors duration-500`}>
      <SpaceBackground isDark={isDark} />
      <ToastContainer theme={isDark ? "dark" : "light"} position="top-center" autoClose={1000} />

      {/* --- SOZLAMALAR (10 TA FUNKSIYA) --- */}
      
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className={`relative w-full max-w-sm ${isDark ? 'bg-[#0f172a]' : 'bg-white'} h-full p-6 shadow-2xl border-l border-white/10 overflow-y-auto`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black flex items-center gap-2 italic"><Settings className="text-cyan-500" /> TIZIM NAZORATI</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-red-500/10 rounded-full transition-colors">✕</button>
              </div>

           <div className="space-y-2">
  {/* 1. Profil */}
  <div 
    onClick={() => setShowProfile(!showProfile)} 
    className="flex flex-col p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group border border-transparent hover:border-cyan-500/20"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <User className="text-slate-400 group-hover:text-cyan-400" size={20}/> 
        <span className="font-bold text-sm">{TEXTS[language].settings.profile}</span>
      </div>
      <ChevronRight size={16} className="text-slate-600"/>
    </div>

    {/* Profil list */}
    {showProfile && (
      <div className="mt-3 ml-8 space-y-1 text-sm font-semibold text-slate-300">
        <p>ID: admin</p>
        <p>Ism: Jorabek</p>
        <p>Email: jorabek@corepos.uz</p>
        <p>Rol: Superuser</p>
      </div>
    )}
  </div>

  {/* 2. Tungi Rejim */}
  <div 
    onClick={() => {
      setIsDark(!isDark); 
      toast.info(
        language === 'UZ' ? (isDark ? "Kunduzgi rejim" : "Tungi rejim") :
        language === 'EN' ? (isDark ? "Day Mode" : "Dark Mode") :
        (isDark ? "Дневной режим" : "Ночной режим")
      )
    }} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group border border-transparent hover:border-cyan-500/20"
  >
    <div className="flex items-center gap-4">
      {isDark ? <Moon size={20}/> : <Sun size={20}/>} 
      <span className="font-bold text-sm">{TEXTS[language].settings.darkMode}</span>
    </div>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${isDark ? 'bg-cyan-600' : 'bg-slate-300'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDark ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>

  {/* 3. Til */}
  <div 
    onClick={() => {
      const nextLang = language === 'UZ' ? 'EN' : language === 'EN' ? 'RU' : 'UZ';
      setLanguage(nextLang); 
      toast.success(
        nextLang === 'UZ' ? "Til o'zgardi!" :
        nextLang === 'EN' ? "Language changed!" :
        "Язык изменен!"
      );
    }} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group border border-transparent hover:border-cyan-500/20"
  >
    <div className="flex items-center gap-4">
      <Globe className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.language}</span>
    </div>
    <span className="text-xs font-black text-cyan-500">{language}</span>
  </div>

  {/* 4. Bildirishnomalar */}
  <div 
    onClick={() => {
      setNotifications(!notifications); 
      toast.info(
        language === 'UZ' ? "Bildirishnomalar yangilandi" :
        language === 'EN' ? "Notifications updated" :
        "Уведомления обновлены"
      )
    }} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group border border-transparent hover:border-cyan-500/20"
  >
    <div className="flex items-center gap-4">
      <Bell className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.notifications}</span>
    </div>
    <span className={`text-[10px] font-black ${notifications ? 'text-emerald-500' : 'text-red-500'}`}>
      {notifications ? (language === 'UZ' ? 'YONIQ' : language === 'EN' ? 'ON' : 'ВКЛ') : (language === 'UZ' ? 'OCHIK' : language === 'EN' ? 'OFF' : 'ВЫКЛ')}
    </span>
  </div>

  {/* 5. To'lov usullari */}
  <div 
    onClick={() => toast.warning(
      language === 'UZ' ? "To'lov turlari: Naqd, Karta" :
      language === 'EN' ? "Payment Methods: Cash, Card" :
      "Методы оплаты: Наличные, Карта"
    )} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <CreditCard className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.paymentMethods}</span>
    </div>
    <ChevronRight size={16} className="text-slate-600"/>
  </div>

  {/* 6. Zaxira nusxa */}
  <div 
    onClick={() => toast.success(
      language === 'UZ' ? "Ma'lumotlar bulutga yuklandi!" :
      language === 'EN' ? "Data uploaded to cloud!" :
      "Данные загружены в облако!"
    )} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <Database className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.backup}</span>
    </div>
    <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded">AUTO</span>
  </div>

  {/* 7. Xodimlar */}
  <div onClick={() => setActiveTab('dashboard')} className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group">
    <div className="flex items-center gap-4">
      <Users className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.employees}</span>
    </div>
    <ChevronRight size={16} className="text-slate-600"/>
  </div>

 {/* 8. Logistika */}
<div 
  onClick={() => {
    setActiveTab("logistics");  // Logistika sahifasini ochadi
    setShowSettings(false);     // Settings panelini yopadi
  }} 
  className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group"
>
  <div className="flex items-center gap-4">
    <Truck className="text-slate-400" size={20}/> 
    <span className="font-bold text-sm">
      {TEXTS[language].settings.logistics}  {/* Tilga mos matn */}
    </span>
  </div>
  <ChevronRight size={16} className="text-slate-600"/>
</div>



  {/* 9. Hisobotlar */}
  <div onClick={() => setActiveTab('dashboard')} className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group">
    <div className="flex items-center gap-4">
      <BarChart3 className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.reports}</span>
    </div>
    <ChevronRight size={16} className="text-slate-600"/>
  </div>

  {/* 10. Xavfsizlik */}
  <div 
    onClick={() => toast.error(
      language === 'UZ' ? "Xavfsizlik tizimi barqaror!" :
      language === 'EN' ? "Security system stable!" :
      "Система безопасности стабильна!"
    )} 
    className="flex items-center justify-between p-4 hover:bg-cyan-500/5 rounded-2xl cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <Shield className="text-slate-400" size={20}/> 
      <span className="font-bold text-sm">{TEXTS[language].settings.security}</span>
    </div>
    <Shield size={16} className="text-emerald-500"/>
  </div>

  {/* Chiqish tugmasi */}
  <button 
    onClick={() => setIsLoggedIn(false)} 
    className="w-full py-4 mt-6 bg-red-500 text-white font-black rounded-2xl shadow-lg shadow-red-900/20 hover:scale-[1.02] transition-all"
  >
    <div className="flex items-center justify-center gap-2">
      <LogOut size={20}/> {TEXTS[language].settings.logout}
    </div>
  </button>
</div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 ${isDark ? 'bg-[#020617]/60' : 'bg-white/80'} backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">C</div>
          <h1 className="text-xl font-bold tracking-tighter">CORE<span className="text-cyan-500">POS</span></h1>
        </div>
        <div className="flex items-center gap-4">
          
          <button onClick={() => setShowSettings(true)} className="p-2.5 hover:bg-cyan-500/10 rounded-full transition-all border border-transparent hover:border-cyan-500/20">
            <Settings size={22} className={isDark ? "text-slate-400" : "text-slate-600"} />
          </button>
        </div>
      </header>

      {/* --- ASOSIY KONTENT --- */}
      <main className="pt-28 pb-32 px-4 max-w-7xl mx-auto">
        
        {/* 📊 STATISTIKA (CHAP TOMON) */}
      {activeTab === 'dashboard' && (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
    {/* Tilga mos yozuv */}
    <h2 className="text-3xl font-black uppercase">
      {TEXTS[language]?.dashboard.title.split(' ')[0]} 
      <span className="text-cyan-500"> {TEXTS[language]?.dashboard.title.split(' ').slice(1).join(' ')}</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`p-8 rounded-[40px] ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} border border-white/10`}>
        <BarChart3 className="text-cyan-400 mb-4" size={32} />
        <p className="opacity-50 text-xs font-black uppercase">{TEXTS[language]?.pos.checkout}</p>
        <h3 className="text-4xl font-black mt-1">${(cart.reduce((s,i)=>s+(i.price*i.qty),0) + 4250).toLocaleString()}</h3>
      </div>
      <div className={`p-8 rounded-[40px] ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} border border-white/10`}>
        <Users className="text-purple-400 mb-4" size={32} />
        <p className="opacity-50 text-xs font-black uppercase">{TEXTS[language]?.settings.employees}</p>
        <h3 className="text-4xl font-black mt-1">1,204 ta</h3>
      </div>
      <div className={`p-8 rounded-[40px] ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} border border-white/10`}>
        <Package className="text-orange-400 mb-4" size={32} />
        <p className="opacity-50 text-xs font-black uppercase">{TEXTS[language]?.inventory.title}</p>
        <h3 className="text-4xl font-black mt-1">{products.reduce((s,p)=>s+p.stock, 0)} ta</h3>
      </div>
    </div>

    <div className={`h-64 w-full ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} rounded-[40px] border border-white/10 p-8 flex items-end gap-4`}>
      {[60, 45, 80, 55, 95, 75, 100].map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-2xl" />
      ))}
    </div>
  </motion.div>
)}



        {/* 🛒 KASSA (ORTA) */}
      {activeTab === 'pos' && (
  <div className="flex flex-col lg:flex-row gap-8 items-start">
    <div className="flex-1 w-full">
      <h2 className="text-2xl font-black uppercase mb-8 italic">
        {TEXTS[language].pos.title} <span className="text-cyan-500 font-normal"></span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {products.map(p => (
          <motion.div 
            key={p.id} 
            whileHover={{ y: -5 }} 
            onClick={() => addToCart(p)} 
            className={`${isDark ? 'bg-white/5' : 'bg-white shadow-lg'} border border-white/5 rounded-[32px] overflow-hidden group hover:border-cyan-500 transition-all cursor-pointer`}
          >
            <div className="h-40 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
              <div className="absolute top-3 right-3 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black text-white">
                {TEXTS[language].pos.stock || 'STOCK'}: {p.stock}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black truncate">{p.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-black text-cyan-500">${p.price}</span>
                <div className="w-10 h-10 bg-cyan-600 rounded-2xl flex items-center justify-center text-white">
                  <Plus size={20}/>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* SAVATCHA */}
    <div className={`w-full lg:w-[420px] ${isDark ? 'bg-[#0f172a]/80 border-white/10' : 'bg-white border-slate-200 shadow-2xl'} border rounded-[40px] flex flex-col h-[75vh] lg:h-[80vh] sticky top-28 backdrop-blur-2xl`}>
      <div className="p-7 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-xl font-black flex items-center gap-3">
          <ShoppingCart className="text-cyan-500" /> {TEXTS[language].pos.cart}
        </h3>
        <button 
          onClick={() => { cart.forEach(i => removeFromCart(i.id)); setCart([]) }} 
          className="text-[10px] font-bold text-red-400 uppercase tracking-widest"
        >
          {TEXTS[language].pos.clearCart || 'Tozalash'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cart.length === 0 
          ? <div className="h-full flex flex-col items-center justify-center opacity-30">
              <ShoppingCart size={60} />
            </div> 
          : cart.map(item => (
            <motion.div 
              key={item.id} 
              layout 
              initial={{ x: 20 }} 
              animate={{ x: 0 }} 
              className={`${isDark ? 'bg-white/5' : 'bg-slate-50'} p-4 rounded-3xl flex gap-4 items-center`}
            >
              <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 font-bold text-sm">
                {item.name} 
                <p className="text-xs font-normal opacity-50">
                  ${item.price} x {item.qty}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-cyan-500">${item.price * item.qty}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 opacity-40 hover:opacity-100 transition-opacity">
                  <Trash2 size={16}/>
                </button>
              </div>
            </motion.div>
          ))
        }
      </div>
      <div className="p-8 bg-black/10 border-t border-white/5 rounded-b-[40px]">
        <p className="text-4xl font-black">${cart.reduce((s, i) => s + (i.price * i.qty), 0).toLocaleString()}</p>
        <button 
          onClick={() => { if(cart.length) { setCart([]); toast.success(TEXTS[language].toast.productAdded); } }} 
          className="w-full py-5 mt-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/20"
        >
          {TEXTS[language].pos.checkout}
        </button>
      </div>
    </div>
  </div>
)}


        {/* 📦 OMBOR (ONG TOMON) */}
  {activeTab === 'inventory' && (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-8"
  >
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-black uppercase tracking-tighter">
        {TEXTS[language].inventory.title.split(' ')[0]} <span className="text-cyan-500 italic">{TEXTS[language].inventory.title.split(' ')[1]}</span>
      </h2>

      {/* Mahsulot qo'shish form tugmasi */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-cyan-600 px-8 py-4 rounded-2xl font-black text-white flex items-center gap-2 shadow-lg shadow-cyan-900/40"
      >
        <Plus size={24} /> {TEXTS[language].inventory.addProduct}
      </button>
    </div>

    {/* Form */}
    {showForm && (
      <div className="p-5 bg-white/10 rounded-2xl space-y-4">
        <input
          type="text"
          placeholder={TEXTS[language].inventory.namePlaceholder || "Mahsulot nomi"}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 rounded-xl border"
        />
        <input
          type="number"
          placeholder={TEXTS[language].inventory.pricePlaceholder || "Narxi ($)"}
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full p-3 rounded-xl border"
        />
        <input
          type="text"
          placeholder={TEXTS[language].inventory.colorPlaceholder || "Rangi"}
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="w-full p-3 rounded-xl border"
        />
        <input
          type="number"
          placeholder={TEXTS[language].inventory.stockPlaceholder || "Qoldiq"}
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          className="w-full p-3 rounded-xl border"
        />

        <button
          onClick={() => {
            if (form.name && form.price && form.stock) {
              setProducts([
                ...products,
                { ...form, id: Date.now(), category: TEXTS[language].inventory.defaultCategory || "Yangi" },
              ]);
              setForm({ name: "", price: "", stock: "", color: "", image: "" });
              setShowForm(false);
            }
          }}
          className="bg-green-500 px-6 py-3 rounded-xl text-white font-bold"
        >
          {TEXTS[language].inventory.addButton || "Qo'shish"}
        </button>
      </div>
    )}

    {/* Mahsulotlar listi */}
    <div className="grid gap-4">
      {products.map((p) => (
        <div
          key={p.id}
          className={`${
            isDark ? "bg-white/5 border-white/5" : "bg-white shadow-md border-slate-100"
          } border p-5 rounded-[35px] flex justify-between items-center`}
        >
          <div className="flex items-center gap-6">
            <img
              src={p.image || "https://picsum.photos/400/400?random=" + p.id}
              className="w-24 h-24 rounded-2xl object-cover shadow-lg"
            />
            <div>
              <h4 className="font-black text-xl">{p.name}</h4>
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full">
                {p.category}
              </span>
              <p className="mt-1 text-sm font-semibold">{TEXTS[language].inventory.colorLabel || "Rangi"}: {p.color || TEXTS[language].inventory.unknownColor}</p>
            </div>
          </div>

          <div className="flex gap-12 items-center">
            <div className="text-right">
              <p className="text-[10px] opacity-50 font-black uppercase">{TEXTS[language].inventory.priceLabel || "Narxi"}</p>
              <p className="text-2xl font-black">${p.price}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-50 font-black uppercase">{TEXTS[language].inventory.stockLabel || "Qoldiq"}</p>
              <p
                className={`text-2xl font-black ${
                  p.stock < 5 ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {p.stock} ta
              </p>
            </div>
            <button
              onClick={() =>
                setProducts(products.filter((item) => item.id !== p.id))
              }
              className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)}

{activeTab === 'logistics' && (
  <div className={`p-8 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} transition-colors`}>
    <Logistics language={language} />
  </div>
)}

      </main>

      {/* --- PASTKI NAVIGATSIYA --- */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md ${isDark ? 'bg-[#0f172a]/80' : 'bg-white/90'} backdrop-blur-3xl border border-white/10 rounded-[35px] p-3 flex justify-around items-center shadow-2xl z-50`}>
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={26}/> },
          { id: 'pos', icon: <ShoppingCart size={26}/> },
          { id: 'inventory', icon: <Package size={26}/> },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`relative p-5 rounded-[28px] transition-all duration-500 ${activeTab === tab.id ? 'bg-cyan-600 text-white scale-110 shadow-lg shadow-cyan-600/50' : 'text-slate-500 hover:text-cyan-400'}`}>
            {tab.icon}
            {activeTab === tab.id && <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;