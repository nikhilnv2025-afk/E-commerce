// src/pages/Admin/createProduct.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Redux/Slice/adminProductSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
    isFeatured: false,
    isPublished: true,
    tags: [],
    dimensions: { length: "", width: "", height: "" },
    weight: "",
    sku: ""
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("dimensions.")) {
      const key = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [key]: value,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    navigate("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Input required label="Product Name" name="name" value={productData.name} onChange={handleChange} />
        <Input required label="Price" name="price" type="number" value={productData.price} onChange={handleChange} />
        <Input label="Discount Price (Optional)" name="discountPrice" type="number" value={productData.discountPrice} onChange={handleChange} />
        <Input required label="Count In Stock" name="countInStock" type="number" value={productData.countInStock} onChange={handleChange} />
        <Input required label="SKU (Unique)" name="sku" value={productData.sku} onChange={handleChange} />
        <Input label="Brand (Optional)" name="brand" value={productData.brand} onChange={handleChange} />
        <Input required label="Category" name="category" value={productData.category} onChange={handleChange} />
        <Input required label="Collections" name="collections" value={productData.collections} onChange={handleChange} />
        <Input label="Material (Optional)" name="material" value={productData.material} onChange={handleChange} />
        <Input required label="Gender" name="gender" value={productData.gender} onChange={handleChange} />

        <Input label="Length (cm) (Optional)" name="dimensions.length" value={productData.dimensions.length} onChange={handleChange} />
        <Input label="Width (cm) (Optional)" name="dimensions.width" value={productData.dimensions.width} onChange={handleChange} />
        <Input label="Height (cm) (Optional)" name="dimensions.height" value={productData.dimensions.height} onChange={handleChange} />
        <Input label="Weight (kg) (Optional)" name="weight" value={productData.weight} onChange={handleChange} />

        <Textarea required label="Description" name="description" value={productData.description} onChange={handleChange} />
        <Input required label="Sizes (comma separated)" name="sizes" value={productData.sizes.join(",")} onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(",").map((s) => s.trim()) })} />
        <Input required label="Colors (comma separated)" name="colors" value={productData.colors.join(",")} onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(",").map((c) => c.trim()) })} />
        <Input label="Tags (comma separated) (Optional)" name="tags" value={productData.tags.join(",")} onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(",").map((t) => t.trim()) })} />

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} />
          <label>Is Featured?</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" checked={productData.isPublished} onChange={handleChange} />
          <label>Is Published?</label>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading image...</p>}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((img, i) => (
              <img key={i} src={img.url} alt={img.altText} className="w-20 h-20 object-cover rounded-md shadow-md" />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input {...props} className="w-full border border-gray-300 rounded-md p-2" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="block font-semibold mb-1">{label}</label>
    <textarea {...props} rows={4} className="w-full border border-gray-300 rounded-md p-2" />
  </div>
);
