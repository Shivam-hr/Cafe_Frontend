import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Coffee, Utensils, Instagram, Facebook, Twitter, ChevronRight, Star, Menu as MenuIcon, X, ChevronLeft, Plus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const CoffeeBean = ({ x, y, rotation, scale, className, size = 20 }: { x?: number; y?: number; rotation?: number; scale?: number; className?: string; size?: number; key?: any }) => (
  <svg viewBox="0 0 100 100" className={`absolute ${className || ''}`} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ left: x, top: y, transform: `rotate(${rotation || 0}deg) scale(${scale || 1})` }}>
    <path d="M50 10C35 10 20 25 20 50C20 75 35 90 50 90C65 90 80 75 80 50C80 25 65 10 50 10Z" fill="url(#beanGrad)" />
    <path d="M50 15C55 25 60 40 50 55C40 70 45 85 50 85" stroke="#3A1E0C" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <defs>
      <linearGradient id="beanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5C3018" />
        <stop offset="100%" stopColor="#2C1810" />
      </linearGradient>
    </defs>
  </svg>
);

// Deterministic bean positions — prevents re-render thrashing from Math.random()
const BEAN_POSITIONS = [
  { x: 120, y: 80, rotation: 45, scale: 0.7 },
  { x: 850, y: 150, rotation: 120, scale: 1.2 },
  { x: 300, y: 600, rotation: 200, scale: 0.9 },
  { x: 950, y: 500, rotation: 330, scale: 0.6 },
  { x: 50, y: 350, rotation: 75, scale: 1.0 },
  { x: 1100, y: 700, rotation: 260, scale: 0.8 },
];

// --- Components ---

const DarkModeToggle = ({ isDark, toggle }: { isDark: boolean; toggle: () => void }) => {
  return (
    <div
      onClick={toggle}
      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${isDark ? "bg-dark-surface border border-white/10" : "bg-brand-surface border border-brand-accent/30"}`}
    >
      <motion.div
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full flex items-center justify-center soft-shadow"
      >
        <Coffee size={12} className={isDark ? "text-dark-bg" : "text-brand-text"} />
      </motion.div>
    </div>
  );
};

const Navbar = ({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Stories", href: "#story" },
    { name: "Menu", href: "#menu" },
    { name: "Equipment", href: "#" },
    { name: "Store", href: "#" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? (isDark ? "bg-dark-bg/80 backdrop-blur-xl py-4 soft-shadow border-b border-white/10" : "bg-brand-bg/80 backdrop-blur-xl py-4 soft-shadow border-b border-brand-accent/20") : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-text dark:bg-transparent rounded-xl flex items-center justify-center text-brand-primary dark:text-dark-accent shadow-lg dark:shadow-none group-hover:scale-110 transition-transform">
            <Coffee size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-text dark:text-dark-accent italic" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>AD Cafe</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-xs font-semibold uppercase tracking-widest group text-brand-text-muted dark:text-dark-text/70"
                whileHover={{ color: isDark ? 'var(--color-dark-accent)' : 'var(--color-brand-text)' }}
                whileTap={{ scale: 0.92 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-brand-text dark:bg-dark-accent"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <DarkModeToggle isDark={isDark} toggle={toggleDark} />
            <button className="bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-white px-6 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all flex items-center gap-2">
              Register ↗
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <DarkModeToggle isDark={isDark} toggle={toggleDark} />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`absolute top-full left-0 w-full border-t p-6 flex flex-col gap-4 md:hidden soft-shadow ${isDark ? "bg-dark-bg/90 backdrop-blur-xl border-white/10" : "bg-brand-bg/90 backdrop-blur-xl border-brand-border/50"}`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-widest text-brand-text-muted dark:text-dark-text/70 hover:text-brand-text dark:hover:text-dark-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-white px-6 py-3 rounded-lg text-sm font-semibold w-full hover:scale-105 transition-all flex items-center justify-center gap-2">
              Register ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Marquee = () => {
  const [isPaused, setIsPaused] = React.useState(false);
  const items = ["DOPPIO", "GALAO", "CAPPUCCINO", "MOCHA", "CORTADO", "LATTE", "AMERICANO"];
  return (
    <div
      className="bg-brand-text dark:bg-dark-accent py-4 overflow-hidden whitespace-nowrap border-y border-brand-border/20 dark:border-white/10 cursor-pointer select-none text-brand-primary dark:text-dark-bg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="inline-block animate-marquee" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-flex items-center">
            {items.map((item) => (
              <span key={item} className="inline-flex items-center mx-8 text-sm font-black tracking-[0.2em]">
                {item} <Coffee size={14} className="ml-4 opacity-50" />
              </span>
            ))}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

// ============================================================
// CoffeeHero — High-quality static image with scroll-driven parallax
// ============================================================

const CoffeeHero = ({ progress, isDark }: { progress: any; isDark: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-driven transforms for a dynamic feel
  const y = useTransform(progress, [0, 1], [0, -40]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.08, 1.02]);
  const rotate = useTransform(progress, [0, 0.5, 1], [0, 2, -1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Loading placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-3 border-brand-accent/30 dark:border-dark-accent/30 border-t-brand-accent dark:border-t-dark-accent rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-text/40 dark:text-dark-text/40">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The high quality coffee image with scroll-driven parallax */}
      <motion.div
        style={{
          y, scale, rotate,
          maskImage: 'radial-gradient(ellipse 78% 78% at 50% 48%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 78% at 50% 48%, black 50%, transparent 95%)',
        }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
      >
        {/* Light mode image */}
        <img
          src="/images/coffee-hero-light.png"
          alt="Premium coffee cup with coffee being poured"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isDark ? 'hidden' : 'block'}`}
        />
        {/* Dark mode image */}
        <img
          src="/images/coffee-hero-dark.png"
          alt="Premium coffee cup with coffee being poured"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isDark ? 'block' : 'hidden'}`}
        />
      </motion.div>
    </div>
  );
};

const Hero = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-auto lg:h-[150vh] transition-colors duration-500 bg-brand-bg dark:bg-dark-bg"
    >
      {/* position: relative on the sticky container fixes the framer-motion scroll offset warning */}
      <div className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-center overflow-hidden py-24 lg:py-0">

        {/* Static ambient background — replaces the old infinite-animation OrganicBgShapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-brand-accent/[0.08] dark:bg-dark-accent/[0.05]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-brand-accent-light/[0.06] dark:bg-dark-accent/[0.03]" />
        </div>

        {/* Deterministic background beans — no Math.random() in render */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          {BEAN_POSITIONS.map((bean, i) => (
            <CoffeeBean
              key={i}
              x={bean.x}
              y={bean.y}
              rotation={bean.rotation}
              scale={bean.scale}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center flex-1 relative z-10 w-full">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 lg:mt-0"
          >
            <h1 className="leading-tight mb-6 text-brand-text dark:text-white tracking-tight" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.8rem)', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}>
              Savor The Perfect <br />
              <span className="italic text-brand-accent dark:text-dark-accent">Blend Of Flavors</span>
            </h1>

            <p className="text-sm mb-10 max-w-md leading-loose text-brand-text/55 dark:text-[#A8A8A8]" style={{ fontFamily: '"Inter", "DM Sans", sans-serif', fontWeight: 400, letterSpacing: '0.015em' }}>
              Welcome to your cozy sanctuary. Step in to savor artisan coffees,
              fresh botanical teas, hand-crafted pastries, and healthy gourmet
              bites prepared fresh every day.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={() => {
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-dark-bg px-8 py-3 rounded-lg text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-text/10 dark:shadow-dark-accent/20 cursor-pointer"
              >
                Explore Menu ↗
              </button>
              <button
                onClick={() => {
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="border border-brand-text/20 dark:border-white/20 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-brand-text/5 dark:hover:bg-white/5 transition-all text-brand-text dark:text-white glass-hover cursor-pointer"
              >
                Order Online 🍽️
              </button>
            </div>
          </motion.div>

          {/* Right: Coffee Visual */}
          <div className="relative flex items-center justify-center h-full lg:-mr-6">

            {/* Larger ambient glow behind the cup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[80%] h-[80%] rounded-full blur-[100px] bg-brand-accent/[0.15] dark:bg-dark-accent/[0.10] animate-pulse-slow" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative z-10 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[680px] xl:h-[680px]"
            >
              <CoffeeHero progress={scrollYProgress} isDark={isDark} />

              {/* Edge-blending overlays — fade image edges into the page background */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-[18%] bg-gradient-to-b from-[var(--color-brand-bg)] dark:from-[var(--color-dark-bg)] to-transparent" />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-[var(--color-brand-bg)] dark:from-[var(--color-dark-bg)] to-transparent" />
                {/* Left fade */}
                <div className="absolute top-0 bottom-0 left-0 w-[12%] bg-gradient-to-r from-[var(--color-brand-bg)] dark:from-[var(--color-dark-bg)] to-transparent" />
                {/* Right fade */}
                <div className="absolute top-0 bottom-0 right-0 w-[10%] bg-gradient-to-l from-[var(--color-brand-bg)] dark:from-[var(--color-dark-bg)] to-transparent" />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-7 py-2.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full border border-brand-border/40 dark:border-white/10 whitespace-nowrap z-20 shadow-lg"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent dark:text-dark-accent">Sip the Moment</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface MenuItem {
  name: string;
  subheading: string;
  price: string;
  volume: string;
  rating: number;
  img: string;
  isHighlighted?: boolean;
  highlightText?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "coffee",
    title: "COFFEE SELECTION",
    subtitle: "Artisanal espresso and traditional warm brews crafted to perfection.",
    items: [
      {
        name: "Aroma Golden Latte",
        subheading: "Our signature double espresso infused with organic turmeric, wildflower honey, and Madagascar vanilla bean.",
        price: "$28.50",
        volume: "240 ml",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Chef's Special"
      },
      {
        name: "Classic Cappuccino",
        subheading: "Rich, bold espresso layer topped with thick, velvety, perfectly aerated milk foam and a dusting of cocoa.",
        price: "$24.50",
        volume: "180 ml",
        rating: 4.6,
        img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Caramel Cortado",
        subheading: "Equal parts robust espresso and warm textured milk, swirled with premium house-made sea-salt caramel.",
        price: "$26.00",
        volume: "120 ml",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Nitro Cold Brew",
        subheading: "Slow-steeped cold brew charged with nitrogen for a rich, stout-like creamy head and naturally sweet flavor.",
        price: "$29.00",
        volume: "320 ml",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Bestseller"
      },
      {
        name: "Espresso Macchiato",
        subheading: "A concentrated, bold shot of espresso marked gently with a dollop of warm steamed milk foam.",
        price: "$22.00",
        volume: "60 ml",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Mocha Frappé",
        subheading: "Blended espresso, rich dark chocolate, and milk over crushed ice, crowned with fresh whipped cream.",
        price: "$30.00",
        volume: "350 ml",
        rating: 4.5,
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    id: "pastries",
    title: "CAKES & PASTRIES",
    subtitle: "Sweet, delicate treats baked fresh every morning by our artisan pastry chefs.",
    items: [
      {
        name: "Red Velvet Cupcake",
        subheading: "Moist, velvety cocoa sponge topped with a rich flower swirl of Madagascar vanilla cream cheese icing.",
        price: "$12.50",
        volume: "1 pc",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Must Try"
      },
      {
        name: "Artisanal Croissant",
        subheading: "Light, flaky, multi-layered French pastry made with pure AOP Normandy butter, served warm and golden.",
        price: "$8.00",
        volume: "1 pc",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Double Chocolate Éclair",
        subheading: "Crispy choux pastry shell filled to the brim with rich Belgian chocolate custard and glazed with glossy dark ganache.",
        price: "$14.00",
        volume: "1 pc",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "New York Cheesecake",
        subheading: "Rich, dense baked cream cheese on a buttery graham cracker crust, topped with house-made wild raspberry compote.",
        price: "$16.50",
        volume: "Slice",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Signature"
      },
      {
        name: "Classic Tiramisu",
        subheading: "Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with premium Valrhona cocoa powder.",
        price: "$15.00",
        volume: "Slice",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Wild Blueberry Muffin",
        subheading: "Buttery, moist muffin bursting with wild blueberries and topped with a crunchy streusel crumble and lemon zest.",
        price: "$7.50",
        volume: "1 pc",
        rating: 4.6,
        img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    id: "snacks",
    title: "GOURMET SAVORY SNACKS",
    subtitle: "Delicious, freshly prepared sandwiches, flatbreads, and healthy savory bites.",
    items: [
      {
        name: "Avocado Sourdough Toast",
        subheading: "Toasted country sourdough topped with smashed Haas avocado, creamy feta cheese, heirloom cherry tomatoes, and microgreens.",
        price: "$18.50",
        volume: "Portion",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Bestseller"
      },
      {
        name: "Truffle & Herb Fries",
        subheading: "Crispy hand-cut russet potatoes tossed in aromatic white truffle oil, fresh rosemary, sea salt, and grated parmesan.",
        price: "$12.00",
        volume: "Portion",
        rating: 4.6,
        img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Tuscan Caprese Panini",
        subheading: "Sourdough panini pressed hot with fresh buffalo mozzarella, vine-ripened tomatoes, sweet basil pesto, and balsamic reduction.",
        price: "$20.00",
        volume: "1 pc",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Spinach & Feta Bistro Roll",
        subheading: "Puff pastry roll filled with seasoned spinach leaves, dill, green onions, and tangy authentic Greek feta cheese.",
        price: "$10.50",
        volume: "1 pc",
        rating: 4.5,
        img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Mediterranean Hummus Bowl",
        subheading: "Creamy house-made chickpea hummus with olive oil drizzle, roasted red peppers, cucumber, and warm pita wedges.",
        price: "$14.00",
        volume: "Portion",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Smoked Salmon Bruschetta",
        subheading: "Toasted ciabatta topped with Norwegian smoked salmon, cream cheese, capers, red onion, and fresh dill.",
        price: "$16.50",
        volume: "2 pcs",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "New"
      }
    ]
  },
  {
    id: "drinks",
    title: "SPECIALTY DRINKS & TEAS",
    subtitle: "Refreshing cold mocktails, botanical iced teas, and nourishing lattes.",
    items: [
      {
        name: "Ceremonial Matcha Latte",
        subheading: "Stone-ground Japanese green tea whisked with creamy steamed oat milk for sustained energy and calm focus.",
        price: "$28.00",
        volume: "220 ml",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400",
        isHighlighted: true,
        highlightText: "Premium Pick"
      },
      {
        name: "Hibiscus Blossom Tea",
        subheading: "Tart organic hibiscus petals cold-brewed with fresh orange peel, wild mint, and a touch of agave nectar.",
        price: "$23.00",
        volume: "380 ml",
        rating: 4.6,
        img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Spiced Chai Latte",
        subheading: "A warm, comforting infusion of stone-crushed black tea, cardamom, ginger, cinnamon, cloves, and textured milk.",
        price: "$26.50",
        volume: "240 ml",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Mango Passion Fizz",
        subheading: "Sparkling natural spring water layered with sweet Alphonso mango purée and tangy fresh passion fruit.",
        price: "$27.00",
        volume: "350 ml",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Iced Lavender Latte",
        subheading: "Chilled espresso blended with organic lavender syrup and oat milk, served over ice with dried lavender buds.",
        price: "$25.50",
        volume: "300 ml",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Turmeric Golden Milk",
        subheading: "Warm, nourishing blend of organic turmeric, Ceylon cinnamon, black pepper, and frothed coconut milk.",
        price: "$24.00",
        volume: "240 ml",
        rating: 4.6,
        img: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
];

const MenuCard = ({ item, isDark }: { item: MenuItem; isDark: boolean; key?: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative p-3 sm:p-6 rounded-custom transition-all duration-300 flex flex-col justify-between select-none bg-brand-surface dark:bg-dark-surface border border-brand-border/40 dark:border-white/5 soft-shadow"
    >
      {/* Highlight Ribbon/Badge */}
      {item.isHighlighted && (
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 px-2 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[8px] font-black uppercase tracking-widest bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-dark-bg rounded-full shadow-sm">
          ★ {item.highlightText || "Special"}
        </span>
      )}

      {/* Image Container */}
      <div className="relative mb-3 sm:mb-6 flex justify-center mt-2 sm:mt-4">
        <div className="w-20 h-20 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 sm:border-4 border-white/30 dark:border-white/10 soft-shadow flex-shrink-0 relative z-10">
          <motion.img
            src={item.img}
            alt={item.name}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h4 
          className="text-sm sm:text-xl font-black uppercase tracking-tight text-brand-text dark:text-dark-text leading-tight" 
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {item.name}
        </h4>
        
        {/* Subheading / Description */}
        <p className="text-[10px] sm:text-xs text-brand-text-muted dark:text-dark-text/60 leading-relaxed mt-1 sm:mt-2 min-h-0 sm:min-h-[48px] line-clamp-2 sm:line-clamp-3">
          {item.subheading}
        </p>

        {/* Rating and Size */}
        <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-brand-text-muted dark:text-dark-text/70 mt-2 sm:mt-4">
          <Star size={10} className="text-brand-accent dark:text-dark-accent fill-brand-accent dark:fill-dark-accent sm:w-3 sm:h-3" />
          <span className="font-bold">{item.rating}</span>
          <span className="opacity-40">|</span>
          <span>{item.volume}</span>
        </div>
      </div>

      {/* Pricing / CTA */}
      <div className="flex items-center justify-between pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-brand-border/40 dark:border-white/10">
        <span 
          className="text-lg sm:text-2xl font-black text-brand-text dark:text-dark-text" 
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {item.price}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-custom flex items-center justify-center transition-all bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-dark-bg cursor-pointer"
        >
          <Plus size={16} className="sm:w-5 sm:h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const FeaturedItems = ({ isDark }: { isDark: boolean }) => {
  const [activeSection, setActiveSection] = useState("coffee");
  const activeSectionRef = useRef("coffee");

  const sectionRefs = {
    coffee: useRef<HTMLElement>(null),
    pastries: useRef<HTMLElement>(null),
    snacks: useRef<HTMLElement>(null),
    drinks: useRef<HTMLElement>(null),
  };

  const categories = MENU_CATEGORIES;

  // Sync ref with state
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Scroll spy implementation
  useEffect(() => {
    const handleScroll = () => {
      const triggerOffset = 180; // offset for navbar + filter bar
      
      for (const [id, ref] of Object.entries(sectionRefs)) {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset && rect.bottom > triggerOffset) {
            if (activeSectionRef.current !== id) {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once initially to check status
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setActiveSection(id);
    }
  };

  return (
    <section id="menu" className="py-24 transition-colors duration-300 bg-brand-bg dark:bg-dark-bg" style={!isDark ? { backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(200,181,156,0.1) 0%, transparent 60%)' } : {}}>
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter text-brand-text dark:text-dark-text" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              OUR MENU
            </h2>
            <p className="text-xs font-medium max-w-sm uppercase tracking-widest leading-relaxed text-brand-text-muted dark:text-dark-text/70">
              There's always room for good food and great coffee. Explore our selection of fresh coffee, organic teas, artisan cakes, and savory snacks.
            </p>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-brand-text dark:text-dark-accent uppercase flex items-center gap-2">
            <span>☕ Crafted with Love & Organic Ingredients</span>
          </div>
        </motion.div>

        {/* Sticky Category Navigator */}
        <div className="sticky top-[72px] z-40 py-2 sm:py-4 -mx-6 px-6 bg-brand-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl border-y border-brand-border/20 dark:border-white/10 mb-8 sm:mb-16 flex justify-start md:justify-center gap-1.5 sm:gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                activeSection === category.id
                  ? "bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-dark-bg shadow-md"
                  : "bg-brand-surface/50 border border-brand-border/40 text-brand-text/70 dark:bg-dark-surface/50 dark:border-white/5 dark:text-dark-text/70 hover:bg-brand-surface dark:hover:bg-dark-surface"
              }`}
            >
              {category.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Vertical List of Category Sections */}
        <div className="space-y-24">
          {categories.map((category) => (
            <section
              key={category.id}
              ref={sectionRefs[category.id as keyof typeof sectionRefs]}
              className="scroll-mt-36"
            >
              {/* Category Header */}
              <div className="border-b border-brand-border/30 dark:border-white/10 pb-3 sm:pb-4 mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-brand-text dark:text-dark-text" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    {category.title}
                  </h3>
                  <p className="text-xs text-brand-text-muted dark:text-dark-text/50 uppercase tracking-widest mt-1">
                    {category.subtitle}
                  </p>
                </div>
                <div className="text-[10px] font-bold tracking-widest text-brand-accent dark:text-dark-accent uppercase">
                  {category.items.length} Options
                </div>
              </div>

              {/* Grid of Items */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
                {category.items.map((item) => (
                  <MenuCard key={item.name} item={item} isDark={isDark} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ isDark }: { isDark: boolean }) => {
  const reviews = [
    { name: "JANE SMITH", role: "Coffee Enthusiast", text: "The Coffee at this shop absolutely really amazing. It's rich flavourful and always brewed to perfection.", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
    { name: "ADAM SIMONS", role: "Food Critic", text: "There's always room for coffee, it's not just coffee, it's an experience, life is better with coffee.", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
    { name: "MARIA GARCIA", role: "Regular Visitor", text: "The ambiance is just as good as the coffee. A perfect place to work or relax with a warm cup of mocha.", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
    { name: "DAVID CHEN", role: "Barista", text: "As someone who works with coffee, I can tell the quality here is top-notch. The roasting process is clearly handled with care.", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <section className="py-24 transition-colors duration-300 bg-brand-primary dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter text-brand-text dark:text-dark-text" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>CUSTOMER REVIEWS</h2>
            <p className="text-xs font-medium text-brand-text-muted dark:text-dark-text/50 max-w-xs uppercase tracking-widest leading-relaxed">
              There's always room for coffee, it's not just coffee, it's an experience, life is better with coffee.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-brand-surface border border-brand-border dark:bg-dark-surface dark:border-white/10 hover:bg-brand-text hover:text-brand-surface dark:hover:bg-dark-accent dark:hover:text-dark-bg">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-brand-surface border border-brand-border dark:bg-dark-surface dark:border-white/10 hover:bg-brand-text hover:text-brand-surface dark:hover:bg-dark-accent dark:hover:text-dark-bg">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-custom flex flex-col md:flex-row gap-6 transition-colors duration-300 bg-brand-surface dark:bg-dark-surface border border-brand-border/40 dark:border-white/5 text-brand-text dark:text-dark-text soft-shadow card-hover"
            >
              <div className="w-24 h-24 rounded-custom overflow-hidden shrink-0 soft-shadow">
                <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-brand-text dark:text-dark-text">{review.name}</h3>
                    <p className="text-[10px] font-bold text-brand-accent dark:text-dark-accent uppercase tracking-widest">{review.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="text-brand-accent dark:text-dark-accent fill-brand-accent dark:fill-dark-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-brand-text-muted dark:text-dark-text/60 leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="text-brand-accent dark:text-dark-accent fill-brand-accent dark:fill-dark-accent" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">5.0 rating</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoastingSection = ({ isDark }: { isDark: boolean }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const roasts = [
    { name: "LIGHT ROAST", img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400" },
    { name: "MEDIUM ROAST", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400" },
    { name: "DARK ROAST", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
    { name: "MEDIUM-DARK ROAST", img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="py-24 transition-colors duration-300 bg-brand-bg dark:bg-dark-bg" style={!isDark ? { backgroundImage: 'linear-gradient(180deg, rgba(200,181,156,0.1) 0%, rgba(200,181,156,0.3) 100%)' } : {}}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter text-brand-text dark:text-dark-text" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>OUR ROASTING</h2>
          <p className="text-xs font-medium text-brand-text-muted dark:text-dark-text/50 max-w-md mx-auto uppercase tracking-widest leading-relaxed">
            A cup of coffee on a warm summer day reminds you there's bright side to every day. There's a great big coffee world waiting for you. And it tastes great!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {roasts.map((roast, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === null ? 1 : (hoveredIndex === idx ? 1.05 : 0.95),
                opacity: hoveredIndex === null ? 1 : (hoveredIndex === idx ? 1 : 0.7)
              }}
              className="group relative overflow-hidden rounded-custom aspect-square soft-shadow cursor-pointer"
            >
              <img src={roast.img} alt={roast.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                <h3 className="text-white text-xl font-black uppercase tracking-tighter leading-tight">{roast.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationMap = ({ isDark }: { isDark: boolean }) => {
  return (
    <section className="py-24 transition-colors duration-300 bg-brand-primary dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter text-brand-text dark:text-dark-text" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            FIND OUR SANCTUARY
          </h2>
          <p className="text-xs font-medium text-brand-text-muted dark:text-dark-text/50 max-w-md mx-auto uppercase tracking-widest leading-relaxed">
            Come in, find a cozy spot, and let us serve you the perfect cup. We are located in the heart of the city.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Hours details card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 p-8 rounded-custom bg-brand-surface dark:bg-dark-surface border border-brand-border/40 dark:border-white/5 text-brand-text dark:text-dark-text soft-shadow flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-accent dark:text-dark-accent mb-3">OUR SANCTUARY</h3>
                <p className="text-xl font-black leading-tight italic" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  AD Cafe & Bistro
                </p>
                <p className="text-xs font-medium opacity-70 leading-relaxed mt-2">
                  123 Java Street, Suite 100 <br />
                  Mochtown, Roastville 98765
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-accent dark:text-dark-accent mb-3">HOURS OF COZY</h3>
                <div className="space-y-1 text-xs font-medium opacity-70">
                  <p>Monday - Friday: 08:00 AM - 09:00 PM</p>
                  <p>Saturday - Sunday: 09:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-accent dark:text-dark-accent mb-3">GET IN TOUCH</h3>
                <div className="space-y-1 text-xs font-medium opacity-70">
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Email: hello@adcafe.com</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-border/40 dark:border-white/10 mt-8">
              <button className="w-full bg-brand-text text-brand-primary dark:bg-dark-accent dark:text-dark-bg py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer">
                Get Directions ↗
              </button>
            </div>
          </motion.div>

          {/* Map display box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 rounded-custom overflow-hidden border border-brand-border/40 dark:border-white/5 soft-shadow min-h-[350px] lg:min-h-full relative"
          >
            {/* Google Map Embedded iframe with adaptive filter styling */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175402636254!2d-73.98685168459392!3d40.74844047932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`w-full h-full min-h-[350px] transition-all duration-500 opacity-90 hover:opacity-100 ${
                isDark ? "grayscale invert-[90%] hue-rotate-180 brightness-[95%] contrast-[90%]" : "grayscale contrast-[95%]"
              }`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer className="pt-20 pb-10 transition-colors duration-300 bg-brand-text text-brand-primary dark:bg-dark-surface dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-brand-primary text-brand-text dark:bg-dark-accent dark:text-dark-bg rounded-xl flex items-center justify-center">
                <Coffee size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-brand-primary dark:text-dark-text">Awaken</span>
            </div>
            <p className="text-xs font-medium opacity-60 leading-relaxed mb-6">
              Cafe Aroma Cafe <br />
              123 Java Street <br />
              Mochtown, Roastville 98765 <br />
              Espresso County, Caffeine State, USA
            </p>
            <div className="flex gap-4">
              <Instagram size={16} className="opacity-60 hover:opacity-100 cursor-pointer" />
              <Facebook size={16} className="opacity-60 hover:opacity-100 cursor-pointer" />
              <Twitter size={16} className="opacity-60 hover:opacity-100 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">OPENING HOURS</h4>
            <div className="space-y-2">
              <p className="text-2xl font-black leading-tight">Monday <br />To <br />Friday</p>
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">08:00 AM - 09:00 PM</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">COFFEE</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">ABOUT US</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Values</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Suppliers</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">HOME</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Coffee</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">List Menu</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Order</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Blogs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
          <p>© 2024 CAFÉ AROMA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-brand-bg dark:bg-dark-bg text-brand-text dark:text-dark-text">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      <main>
        <Hero isDark={isDark} />
        <Marquee />
        <FeaturedItems isDark={isDark} />
        <RoastingSection isDark={isDark} />
        <Testimonials isDark={isDark} />
        <Marquee />
        <LocationMap isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  );
}
