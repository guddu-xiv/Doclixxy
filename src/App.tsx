/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Files, 
  ShieldCheck, 
  Stamp, 
  Link as LinkIcon, 
  Scissors, 
  Moon, 
  Sun, 
  MessageCircle,
  ChevronRight,
  Zap,
  Globe,
  X,
  Upload,
  Download,
  Loader2,
  Trash2,
  Plus
} from 'lucide-react';
import { PDFDocument, PDFName, PDFString, PDFArray, degrees } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';

// Setup pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbCWHlAAe5ViyhoTjy24";
const LOGO_URL = "https://i.ibb.co/hxKkk9DQ/34242-removebg-preview.png";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools: Tool[] = [
    {
      id: "image-form",
      title: "Secure PDF Lock",
      description: "Convert your PDF into uncopyable image layers. Prevent text selection and data scraping with absolute security.",
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      color: "from-red-500/10 to-red-600/5"
    },
    {
      id: "watermark",
      title: "Batch Watermarking",
      description: "Embed your professional identity. Apply high-speed logo watermarks across hundreds of pages in seconds.",
      icon: <Stamp className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500/10 to-blue-600/5"
    },
    {
      id: "merger",
      title: "Pro PDF Merger",
      description: "Combine multiple PDF records into a single high-quality file with zero metadata loss and perfect alignment.",
      icon: <Files className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-500/10 to-indigo-600/5"
    },
    {
      id: "injector",
      title: "Hyperlink Injector",
      description: "Scale your document reach. Batch inject global or specific target URLs across massive PDF document sets.",
      icon: <LinkIcon className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/10 to-emerald-600/5"
    },
    {
      id: "extractor",
      title: "Slice & Extract",
      description: "Surgical page management. Quickly remove unwanted pages or extract specific ranges into new PDF documents.",
      icon: <Scissors className="w-6 h-6 text-amber-500" />,
      color: "from-amber-500/10 to-amber-600/5"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-apple-gray-600 dark:text-apple-gray-100 transition-colors duration-500 selection:bg-[#0071e3] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass h-16' : 'h-20'}`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={LOGO_URL} alt="Doclixxy Logo" className="w-10 h-10 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500 object-contain bg-white" />
            <span className="text-xl font-semibold tracking-tight text-apple-gray-600 dark:text-white">Doclixxy</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-500/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-primary text-sm hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] border-none"
            >
              <MessageCircle className="w-4 h-4" /> Join Community
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#0071e3] font-semibold text-sm tracking-wider uppercase mb-4 block">Ultimate PDF Engine</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-apple-gray-600 dark:text-white">
              PDF processing,<br />
              <span className="text-apple-gray-300 dark:text-apple-gray-400">truly refined.</span>
            </h1>
            <p className="text-xl text-apple-gray-400 dark:text-apple-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Doclixxy is a premium browser-native PDF engine. Fast, secure, and designed for professional document workflows without the clutter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="apple-button-primary w-full sm:w-auto px-10 py-4 text-lg"
              >
                Launch Tools
              </button>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                className="apple-button-secondary w-full sm:w-auto px-10 py-4 text-lg flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Channel
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-grid" className="py-20 px-6 bg-apple-gray-100/50 dark:bg-[#161617]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveTool(tool)}
                className="tool-card group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{tool.title}</h3>
                <p className="text-apple-gray-400 leading-relaxed mb-6">
                  {tool.description}
                </p>
                <div className="flex items-center text-[#0071e3] font-medium transition-all group-hover:translate-x-1">
                  Launch Tool <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Experience */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 dark:text-white leading-tight">
                Privacy is not a feature.<br />
                It's a promise.
              </h2>
              <div className="space-y-8">
                {[
                  { icon: <Zap className="w-6 h-6" />, title: "Instant Engine", text: "High-performance PDF manipulation. Experience lightning-fast processing with zero quality degradation." },
                  { icon: <ShieldCheck className="w-6 h-6" />, title: "Privacy Protocol", text: "Absolute security. All PDF tasks occur locally in your browserâ€”your private documents never touch our servers." },
                  { icon: <Globe className="w-6 h-6" />, title: "Universal PDF Suite", text: "Browser-native document tools. Ready on any device, from mobile to desktop, with no installation required." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-apple-gray-100 dark:bg-apple-gray-500/20 rounded-full flex items-center justify-center dark:text-[#0071e3]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold dark:text-white mb-1">{item.title}</h4>
                      <p className="text-apple-gray-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0071e3] to-[#40b1ff] shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-10">
                  <FileText className="w-32 h-32 mx-auto mb-10 opacity-80" />
                  <div className="space-y-4">
                    <div className="h-2 w-48 bg-white/20 rounded-full mx-auto animate-pulse" />
                    <div className="h-2 w-32 bg-white/20 rounded-full mx-auto animate-pulse delay-75" />
                    <div className="h-2 w-40 bg-white/20 rounded-full mx-auto animate-pulse delay-150" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 glass rounded-2xl p-6 flex items-center justify-between">
                <span className="font-medium">Securely processing...</span>
                <div className="w-8 h-8 rounded-full border-2 border-white/50 border-t-white animate-spin" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Active Tool View */}
      <AnimatePresence>
        {activeTool && (
          <ToolRunner tool={activeTool} onClose={() => setActiveTool(null)} />
        )}
      </AnimatePresence>
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-apple-gray-200 dark:border-apple-gray-500/20 text-center">
        <p className="text-[10px] font-medium text-apple-gray-400 select-none tracking-widest uppercase">
          Developer <a 
            href="https://instagram.com/guddu.xiv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 hover:scale-150 inline-block transition-transform duration-300 ml-1"
          >
            â¤ï¸
          </a>
        </p>
      </footer>
    </div>
  );
}

function ToolRunner({ tool, onClose }: { tool: Tool, onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Tool specific states
  const [watermarkLogo, setWatermarkLogo] = useState<File | null>(null);
  const [rotation, setRotation] = useState(-30);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(2000);
  
  // Injector enhanced states
  const [globalLink, setGlobalLink] = useState('');
  const [perPageLinks, setPerPageLinks] = useState('');
  const [rangeLinksText, setRangeLinksText] = useState('');
  const [replaceExistingLinks, setReplaceExistingLinks] = useState(false);
  const [outputBaseName, setOutputBaseName] = useState('Doclixxy_Linked');
  const [detectedPages, setDetectedPages] = useState(0);

  const [pageRanges, setPageRanges] = useState('');

  useEffect(() => {
    const detect = async () => {
      if (tool.id === 'injector' && files.length > 0) {
        try {
          const bytes = await files[0].arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          setDetectedPages(pdf.getPageCount());
        } catch (e) {
          console.error("Page detection failed", e);
        }
      } else {
        setDetectedPages(0);
      }
    };
    detect();
  }, [files, tool.id]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatus('Initializing processing...');
    setProgress(0);

    try {
      if (tool.id === 'merger') await mergePdfs();
      else if (tool.id === 'image-form') await convertToImagePdf();
      else if (tool.id === 'watermark') await applyWatermark();
      else if (tool.id === 'injector') await injectLinks();
      else if (tool.id === 'extractor') await extractPages();
      
      setStatus('Successfully completed!');
    } catch (err) {
      console.error(err);
      setStatus('Ouch! Something went wrong.');
    } finally {
      setIsProcessing(false);
    }
  };

  const mergePdfs = async () => {
    const { PDFDocument } = await import('pdf-lib');
    const mergedPdf = await PDFDocument.create();
    const totalFiles = files.length;
    
    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      setStatus(`Merging ${file.name}...`);
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      
      const currentProgress = ((i + 1) / totalFiles) * 100;
      setProgress(currentProgress);
      // Small delay to ensure UI updates during batch
      await new Promise(r => setTimeout(r, 0));
    }
    
    setStatus('Finalizing merged document...');
    const mergedBytes = await mergedPdf.save();
    download(mergedBytes, 'Doclixxy_Combined.pdf');
    setProgress(100);
  };

  const convertToImagePdf = async () => {
    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const outputPdf = new jsPDF('p', 'pt', 'a4');
    
    for (let i = 1; i <= pdf.numPages; i++) {
      setStatus(`Rasterizing page ${i}/${pdf.numPages}...`);
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      if (i > 1) outputPdf.addPage();
      const pdfWidth = outputPdf.internal.pageSize.getWidth();
      const pdfHeight = outputPdf.internal.pageSize.getHeight();
      outputPdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      setProgress((i / pdf.numPages) * 100);
    }
    const pdfData = outputPdf.output('arraybuffer');
    download(new Uint8Array(pdfData), 'Doclixxy_Secured_Images.pdf');
  };

  const applyWatermark = async () => {
    if (!watermarkLogo) {
      alert("Please upload a logo image first.");
      return;
    }
    const pdfBytes = await files[0].arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const logoBytes = await watermarkLogo.arrayBuffer();
    
    const image = watermarkLogo.type.includes('png') 
      ? await pdfDoc.embedPng(logoBytes) 
      : await pdfDoc.embedJpg(logoBytes);

    const pages = pdfDoc.getPages();
    const from = Math.max(startPage - 1, 0);
    const to = Math.min(endPage, pages.length);
    const totalToProcess = to - from;
    let processedCount = 0;

    for (let i = from; i < to; i++) {
      setStatus(`Watermarking page ${i + 1}/${to}...`);
      const page = pages[i];
      const { width, height } = page.getSize();
      const scale = (Math.min(width, height) * 0.4) / Math.max(image.width, image.height);
      const dims = image.scale(scale);
      
      page.drawImage(image, {
        x: (width - dims.width) / 2,
        y: (height - dims.height) / 2,
        width: dims.width,
        height: dims.height,
        rotate: degrees(rotation),
        opacity: 0.3
      });
      processedCount++;
      setProgress((processedCount / totalToProcess) * 100);
      if (processedCount % 10 === 0) await new Promise(r => setTimeout(r, 0));
    }
    const modifiedBytes = await pdfDoc.save();
    download(modifiedBytes, `Doclixxy_Watermarked_${files[0].name}`);
  };

  const injectLinks = async () => {
    const total = files.length;
    const global = globalLink.trim();
    const perPage: Record<number, string> = {};
    const ranges: { s: number, e: number, u: string }[] = [];

    // Parse per-page links (1=url)
    perPageLinks.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const page = parseInt(parts[0].trim());
        const url = parts.slice(1).join('=').trim();
        if (!isNaN(page) && url) perPage[page] = url;
      }
    });

    // Parse range links (1-5=url)
    rangeLinksText.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const rangePart = parts[0].trim();
        const url = parts.slice(1).join('=').trim();
        const rangeMatch = rangePart.match(/^(\d+)-(\d+)$/);
        if (rangeMatch && url) {
          ranges.push({ s: parseInt(rangeMatch[1]), e: parseInt(rangeMatch[2]), u: url });
        }
      }
    });
    
    for (let f = 0; f < total; f++) {
      const file = files[f];
      setStatus(`Injecting links into file ${f + 1}/${total}...`);
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pageNum = i + 1;
        const { width, height } = page.getSize();
        
        if (replaceExistingLinks) {
          page.node.delete(PDFName.of('Annots'));
        }

        // Determine correct URL
        let finalUrl = perPage[pageNum] || global;
        for (const r of ranges) {
          if (pageNum >= r.s && pageNum <= r.e) {
            finalUrl = r.u;
            break;
          }
        }

        if (finalUrl) {
          const action = pdf.context.register(pdf.context.obj({
            Type: PDFName.of('Action'),
            S: PDFName.of('URI'),
            URI: PDFString.of(finalUrl)
          }));
          
          const newAnnot = pdf.context.register(pdf.context.obj({
            Type: PDFName.of('Annot'),
            Subtype: PDFName.of('Link'),
            Rect: [0, 0, width, height],
            Border: [0, 0, 0],
            A: action
          }));

          let annots = page.node.get(PDFName.of('Annots'));
          if (annots && (annots instanceof PDFArray || typeof (annots as any).push === 'function')) {
            (annots as any).push(newAnnot);
          } else {
            page.node.set(PDFName.of('Annots'), pdf.context.obj([newAnnot]));
          }
        }
        
        if (i % 15 === 0) await new Promise(r => setTimeout(r, 0));
      }
      
      const out = await pdf.save();
      const name = outputBaseName || 'Doclixxy_Linked';
      const actualName = total > 1 ? `${name}_part_${f + 1}.pdf` : `${name}.pdf`;
      download(out, actualName);
      
      setProgress(((f + 1) / total) * 100);
    }
  };

  const extractPages = async () => {
    setStatus('Extracting specified pages...');
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const newPdf = await PDFDocument.create();
    
    const keptIndices: number[] = [];
    const parts = pageRanges.split(',').map(s => s.trim());
    parts.forEach(p => {
      if (p.includes('-')) {
        const [start, end] = p.split('-').map(Number);
        for (let i = start; i <= end; i++) keptIndices.push(i - 1);
      } else if (p) {
        keptIndices.push(Number(p) - 1);
      }
    });

    const validIndices = keptIndices.filter(idx => idx >= 0 && idx < pdf.getPageCount());
    const copiedPages = await newPdf.copyPages(pdf, validIndices);
    copiedPages.forEach(p => newPdf.addPage(p));
    
    const out = await newPdf.save();
    download(out, `Doclixxy_Extracted_${files[0].name}`);
    setProgress(100);
  };

  const download = (data: Uint8Array, name: string) => {
    try {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      
      // Append to DOM for better mobile/tablet support
      document.body.appendChild(a);
      a.click();
      
      // Delay removal to ensure browser handles the request
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 200);
    } catch (e) {
      console.error("Download failed:", e);
      alert("Download failed. Please try again or use a different browser.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white dark:bg-[#1c1c1e] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-apple-gray-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-apple-gray-100 to-white dark:from-white/10 dark:to-transparent flex items-center justify-center`}>
              {tool.icon}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold dark:text-white">{tool.title}</h2>
              <p className="text-xs md:text-sm text-apple-gray-400 truncate max-w-[200px] sm:max-w-none">{tool.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 md:space-y-8 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {/* File Upload Area */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold dark:text-white">
              {tool.id === 'merger' ? 'Select PDF files to merge' : 'Select PDF file'}
            </label>
            <div className="relative group">
              <input 
                type="file" 
                multiple={tool.id === 'merger'} 
                accept="application/pdf"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-apple-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center gap-4 group-hover:bg-apple-gray-50 dark:group-hover:bg-white/[0.02] transition-colors">
                <Upload className="w-8 h-8 text-apple-gray-300" />
                <div className="text-center">
                  <p className="text-apple-gray-400 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-apple-gray-300 mt-1">Directly processed in your browser â€¢ Unlimited MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool specific inputs */}
          {tool.id === 'watermark' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold dark:text-white mb-3">Company Logo / Watermark</label>
                <input type="file" accept="image/*" onChange={(e) => setWatermarkLogo(e.target.files?.[0] || null)} className="text-sm cursor-pointer w-full text-apple-gray-400" />
                <p className="text-[10px] text-apple-gray-300 mt-1">Recommended PNG with transparency</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Rotation</label>
                  <input type="number" value={rotation} onChange={e => setRotation(Number(e.target.value))} className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Start Page</label>
                  <input type="number" value={startPage} onChange={e => setStartPage(Number(e.target.value))} className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold dark:text-white mb-1">Target End Page</label>
                  <input type="number" value={endPage} onChange={e => setEndPage(Number(e.target.value))} className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]" />
                </div>
              </div>
            </div>
          )}

          {tool.id === 'injector' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Document Pages</label>
                  <input type="text" value={detectedPages > 0 ? detectedPages : "No PDF"} disabled className="w-full bg-apple-gray-100 dark:bg-white/10 rounded-xl p-3 border-none text-apple-gray-400 font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Filename Suffix</label>
                  <input type="text" value={outputBaseName} onChange={e => setOutputBaseName(e.target.value)} className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-white mb-1">Global Anchor Link</label>
                <input 
                  type="url" 
                  placeholder="https://yourwebsite.com"
                  value={globalLink}
                  onChange={e => setGlobalLink(e.target.value)}
                  className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Per-Page Map</label>
                  <textarea 
                    placeholder="1=https://google.com&#10;2=https://bing.com"
                    value={perPageLinks}
                    onChange={e => setPerPageLinks(e.target.value)}
                    className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3] text-xs h-24 custom-scrollbar"
                  />
                  <p className="text-[10px] text-apple-gray-300 mt-1">Page=FullWidthLink</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-white mb-1">Range Injection</label>
                  <textarea 
                    placeholder="1-5=https://apple.com&#10;6-10=https://amazon.com"
                    value={rangeLinksText}
                    onChange={e => setRangeLinksText(e.target.value)}
                    className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3] text-xs h-24 custom-scrollbar"
                  />
                  <p className="text-[10px] text-apple-gray-300 mt-1">Start-End=URL</p>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 bg-apple-gray-50 dark:bg-white/5 rounded-xl cursor-pointer hover:bg-apple-gray-100 dark:hover:bg-white/10 transition-colors">
                <input 
                  type="checkbox" 
                  checked={replaceExistingLinks}
                  onChange={e => setReplaceExistingLinks(e.target.checked)}
                  className="w-4 h-4 accent-[#0071e3]"
                />
                <span className="text-sm font-medium dark:text-white">Clear existing document hyperlinks</span>
              </label>
            </div>
          )}

          {tool.id === 'extractor' && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold dark:text-white">Define Page Selection</label>
              <input 
                type="text" 
                placeholder="Ex: 1, 3, 5-10, 15"
                value={pageRanges}
                onChange={e => setPageRanges(e.target.value)}
                className="w-full bg-apple-gray-50 dark:bg-white/5 rounded-xl p-3 border-none focus:ring-1 ring-[#0071e3]"
              />
              <p className="text-xs text-apple-gray-400">Use commas for specific pages and dashes for ranges.</p>
            </div>
          )}

          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-apple-gray-300">Queued PDFs</span>
                <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:underline font-bold">Clear Queue</button>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-apple-gray-50 dark:bg-white/5 rounded-xl text-xs md:text-sm">
                    <span className="truncate max-w-[70%] dark:text-white">{file.name}</span>
                    <span className="text-apple-gray-400 font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress & Status */}
          {isProcessing && (
            <div className="space-y-3 py-2">
              <div className="flex justify-between text-sm">
                <span className="dark:text-white animate-pulse text-xs md:text-sm">{status}</span>
                <span className="font-bold text-[#0071e3] font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-apple-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#0071e3]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button 
            disabled={files.length === 0 || isProcessing}
            onClick={handleProcess}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
              isProcessing ? 'bg-apple-gray-100 dark:bg-white/10 text-apple-gray-300' : 'bg-[#0071e3] hover:bg-[#0077ed] text-white focus:ring-4 ring-[#0071e3]/20 shadow-lg'
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>{
                tool.id === 'merger' ? 'Merge Documents' :
                tool.id === 'image-form' ? 'Flatten & Lock PDF' :
                tool.id === 'watermark' ? 'Apply Batch Watermark' :
                tool.id === 'injector' ? 'Execute Link Injection' :
                'Process Selection'
              } <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
