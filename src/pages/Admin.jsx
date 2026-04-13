import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuPlus,
  LuUpload,
  LuCheck,
  LuX,
  LuLoader,
  LuLock,
  LuArrowRight,
  LuPencil,
  LuLayoutGrid,
  LuLayoutList,
  LuArrowLeft,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";
import { useProducts } from "../context/ProductContext";

const ADMIN_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwrs7CZejCQu8fH1ypSJ8ePCuC0yQzlxOsLI4IzMe2hR9mB9z6vhz9o8TJXQOGhU4Ec/exec";
const PASS_HASH =
  "b886739b183cf58c620d83a0d77d1d5e58e0b1f9ecd5a49b4dfb1ccc6cc9e55f";

export default function Admin() {
  const {
    products,
    loading: productsLoading,
    refreshProducts,
    optimisticRemoveProduct,
  } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [view, setView] = useState("list"); // 'list' | 'add' | 'edit'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    category: "Indoor",
    price: "",
    description: "",
    tag: "New",
    image1: null,
    image2: null,
    image3: null,
    inStock: "TRUE",
  });

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("oasi_admin_session");
    if (session === PASS_HASH) setIsAuthenticated(true);
  }, []);

  const hashString = async (string) => {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedInput = await hashString(passInput);
    if (hashedInput === PASS_HASH) {
      setIsAuthenticated(true);
      localStorage.setItem("oasi_admin_session", PASS_HASH);
    } else {
      setAuthError(true);
      setPassInput("");
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      scientificName: product.scientificName,
      category: product.category,
      price: product.priceValue,
      description: product.description,
      tag: product.tag,
      image1: null,
      image2: null,
      image3: null,
      inStock: product.inStock ? "TRUE" : "FALSE",
    });
    setView("edit");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      scientificName: "",
      category: "Indoor",
      price: "",
      description: "",
      tag: "None",
      image1: null,
      image2: null,
      image3: null,
      inStock: "TRUE",
    });
    setEditingId(null);
    setIsAddingNewCategory(false);
    setView("list");
  };

  const processImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width,
            height = img.height;
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/webp", 0.8).split(",")[1]);
        };
      };
    });
  };

  const categories = ["Indoor", "Outdoor", "Rare", "General"];
  const tags = [
    "New Arrivals",
    "Featured",
    "Best Seller",
    "Premium Grade",
    "Collectors",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // DUAL-KEY PAYLOAD (Talks both "Spreadsheet" and "Code" language)
      const payload = {
        action: editingId ? "update" : "add",
        id: String(editingId || Date.now()),

        // Product Name
        "Product Name": formData.name,
        name: formData.name,

        // Scientific Name
        "Scientific Name": formData.scientificName,
        scientificName: formData.scientificName,

        // Category
        Category: formData.category,
        category: formData.category,

        // Price
        Price: formData.price,
        price: formData.price,

        // Description
        Description: formData.description,
        description: formData.description,

        // Tag
        Tag: formData.tag,
        tag: formData.tag,

        // Stock Status
        inStock: formData.inStock,

        // Images (With both formats)
        "Image 1": "keep",
        image1: "keep",
        "Image 2": "keep",
        image2: "keep",
        "Image 3": "keep",
        image3: "keep",
      };

      // Process image updates/removals
      for (let i = 1; i <= 3; i++) {
        const field = `image${i}`;
        const header = `Image ${i}`;
        if (formData[field] instanceof File) {
          const base64 = await processImage(formData[field]);
          payload[header] = base64;
          payload[field] = base64;
        } else if (formData[field] === "REMOVE") {
          payload[header] = "";
          payload[field] = "";
        }
      }

      await fetch(ADMIN_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        refreshProducts();
        resetForm();
      }, 2000);
    } catch (err) {
      setError("Connection Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to remove this product? This cannot be undone.",
      )
    )
      return;

    // Optimistically remove it from the UI immediately to avoid confusion
    optimisticRemoveProduct(id);
    setLoading(true);

    try {
      await fetch(ADMIN_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "delete", id: id }),
      });
      setSuccess(true);

      // Delay the hard refresh slightly to ensure Google Sheets API has finished saving the CSV
      setTimeout(() => {
        setSuccess(false);
        refreshProducts();
      }, 3000);
    } catch (err) {
      setError("Delete failed. Please try again.");
      // Note: If this were a production database, we would revert the optimistic delete here.
      // But because Google Apps Script 'no-cors' always succeeds from the browser's perspective,
      // the error block is rarely hit unless there's a literal network disconnect.
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <LuLock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-8 text-primary">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Passcode"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              className="w-full bg-surface px-6 py-4 rounded-2xl border border-outline-variant focus:border-primary outline-none text-center font-bold tracking-widest"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-900 transition-all"
            >
              Unlock Dashboard <LuArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 fluid-px max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {view !== "list" && (
            <button
              onClick={() => setView("list")}
              className="p-3 md:p-4 bg-surface-container-high rounded-2xl hover:bg-surface-container-highest transition-all shrink-0 active:scale-95"
            >
              <LuArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-xl md:text-4xl font-black text-primary tracking-tight truncate">
              Oasí Workshop
            </h1>
            <p className="text-[10px] md:text-base text-on-surface-variant font-medium opacity-70 italic">
              Welcome back, Administrator.
            </p>
          </div>

          <div className="md:hidden ml-auto">
            <button
              onClick={() => {
                localStorage.removeItem("oasi_admin_session");
                setIsAuthenticated(false);
              }}
              className="p-2.5 text-on-surface-variant hover:text-error bg-surface-container-high rounded-2xl active:scale-90"
            >
              <LuLock className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full md:w-auto">
          {view === "list" && (
            <>
              <button
                onClick={() => {
                  refreshProducts();
                  setSuccess(true);
                  setTimeout(() => setSuccess(false), 1500);
                }}
                className="flex-1 p-3.5 bg-surface-container-high rounded-xl hover:bg-primary/10 text-primary transition-all flex items-center justify-center gap-2 font-black text-xs px-5"
              >
                <LuLoader
                  className={`w-4 h-4 ${productsLoading ? "animate-spin" : ""}`}
                />{" "}
                Sync Database
              </button>
              <button
                onClick={() => setView("add")}
                className="flex-1 bg-primary text-white p-3.5 md:px-6 md:py-3 rounded-xl font-black flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs"
              >
                <LuPlus className="w-4 h-4" /> New Product
              </button>
            </>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("oasi_admin_session");
              setIsAuthenticated(false);
            }}
            className="hidden md:flex p-3 text-on-surface-variant hover:text-error transition-colors bg-surface-container-high rounded-2xl"
          >
            <LuLock className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-container-low p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-outline-variant/10 gap-3">
              <h2 className="font-black text-primary text-base md:text-xl">
                Your Collection
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 w-full sm:w-auto">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">
                  Sort Collection:
                </span>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-surface px-4 py-2 md:py-2 rounded-lg border border-outline-variant outline-none text-xs font-bold appearance-none pr-10"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 w-4 h-4" />
                </div>
              </div>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-20">
                <LuLoader className="w-12 h-12 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(
                    (p) =>
                      filterCategory === "All" || p.category === filterCategory,
                  )
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/20 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
                    >
                      <div className="h-48 bg-surface-container-highest relative overflow-hidden">
                        <img
                          src={
                            product.images ? product.images[0] : product.image
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="w-10 h-10 bg-white/90 backdrop-blur shadow-md text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                          >
                            <LuPencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="w-10 h-10 bg-white/90 backdrop-blur shadow-md text-error rounded-full flex items-center justify-center hover:bg-error hover:text-white transition-all"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                              product.inStock
                                ? "bg-primary text-white"
                                : "bg-error text-white"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-sm font-black text-primary mb-1 line-clamp-1 uppercase tracking-tight">
                              {product.name}
                            </h3>
                            <p className="text-[10px] text-on-surface-variant font-bold mb-2 opacity-60">
                              {product.category}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/10">
                            <span className="font-black text-primary text-base">
                              {product.price}
                            </span>
                            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter bg-surface-container px-2 py-1 rounded">
                              ID: {String(product.id).slice(-6)}
                            </span>
                          </div>
                        </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-surface-container-low p-5 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/20 shadow-xl space-y-8 md:space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div className="space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Species Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Scientific Name
                </label>
                <input
                  type="text"
                  name="scientificName"
                  placeholder="e.g. Monstera Deliciosa"
                  value={formData.scientificName}
                  onChange={(e) =>
                    setFormData({ ...formData, scientificName: e.target.value })
                  }
                  className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none italic"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Price (₹)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Availability
                </label>
                <select
                  value={formData.inStock}
                  onChange={(e) =>
                    setFormData({ ...formData, inStock: e.target.value })
                  }
                  className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none appearance-none font-bold text-primary"
                >
                  <option value="TRUE">🟢 In Stock (Available)</option>
                  <option value="FALSE">🔴 Out of Stock (Sold Out)</option>
                </select>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Category
                </label>
                {!isAddingNewCategory ? (
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === "ADD_NEW") {
                        setIsAddingNewCategory(true);
                      } else {
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none appearance-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option
                      value="ADD_NEW"
                      className="font-bold text-secondary"
                    >
                      + Add Custom Category
                    </option>
                  </select>
                ) : (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Category name..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 bg-surface px-4 py-3 rounded-xl border border-primary outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCategory.trim()) {
                          setFormData({
                            ...formData,
                            category: newCategory.trim(),
                          });
                          setIsAddingNewCategory(false);
                          setNewCategory("");
                        }
                      }}
                      className="bg-primary text-white px-3 rounded-xl"
                    >
                      <LuCheck />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewCategory(false)}
                      className="bg-surface-container text-on-surface-variant px-3 rounded-xl"
                    >
                      <LuX />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                  Promotional Tag
                </label>
                <select
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full bg-surface px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none appearance-none font-bold"
                >
                  <option value="None">No Tag</option>
                  {tags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[10px] md:text-sm font-black text-primary uppercase tracking-widest ml-1">
                Description
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-surface px-5 py-4 rounded-xl md:rounded-2xl border border-outline-variant focus:border-primary outline-none resize-none"
              ></textarea>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3].map((num) => {
                  const currentImg = products.find(
                    (p) => String(p.id) === String(editingId),
                  )?.images?.[num - 1];
                  const selectedFile = formData[`image${num}`];

                  return (
                    <div key={num} className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">
                        Slot {num}
                      </label>
                      <div
                        onClick={() =>
                          document.getElementById(`file-${num}`).click()
                        }
                        className="relative group h-40 md:h-48 rounded-xl md:rounded-2xl border-2 border-dashed border-outline-variant hover:border-primary transition-all overflow-hidden bg-surface flex flex-col items-center justify-center p-2 cursor-pointer"
                      >
                        <input
                          type="file"
                          id={`file-${num}`}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file)
                              setFormData({
                                ...formData,
                                [`image${num}`]: file,
                              });
                          }}
                        />

                        {selectedFile instanceof File ||
                        (currentImg && selectedFile !== "REMOVE") ? (
                          <>
                            <img
                              src={
                                selectedFile instanceof File
                                  ? URL.createObjectURL(selectedFile)
                                  : currentImg
                              }
                              className="w-full h-full object-cover rounded-lg"
                              alt={`Preview ${num}`}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({
                                  ...formData,
                                  [`image${num}`]: "REMOVE",
                                });
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
                            >
                              <LuX className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            {selectedFile === "REMOVE" ? (
                              <div className="text-error font-bold text-[9px] uppercase flex flex-col items-center animate-pulse">
                                <LuTrash2 className="w-6 h-6 mb-1" />
                                Remove Sync
                              </div>
                            ) : (
                              <div className="text-outline-variant group-hover:text-primary transition-colors flex flex-col items-center">
                                <LuPlus className="w-8 h-8 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">
                                  Add Photo
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col-reverse md:flex-row items-stretch md:items-center gap-4 pt-6 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 md:flex-none px-10 py-5 bg-surface-container-highest rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm hover:bg-error hover:text-white transition-all uppercase tracking-[0.2em] shadow-sm active:scale-95"
                >
                  Discard
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-[2] bg-primary text-white py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-xl hover:bg-secondary transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <LuLoader className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      <span className="uppercase tracking-widest text-xs md:text-sm">
                        Syncing Inventory...
                      </span>
                    </>
                  ) : (
                    <>
                      <LuCheck className="w-5 h-5 md:w-7 md:h-7" />{" "}
                      {view === "edit"
                        ? "Commit Changes"
                        : "Publish to Gallery"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-surface p-12 rounded-[3.5rem] text-center max-w-sm mx-6 shadow-2xl"
            >
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <LuCheck className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black mb-4">Inventory Sync!</h2>
              <p className="text-on-surface-variant mb-6">
                Database has been updated successfully.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
