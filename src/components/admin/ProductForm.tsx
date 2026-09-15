"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const PRODUCT_IMAGE_ERROR =
  "Please select a JPG, PNG, or WEBP image smaller than 5 MB.";

export type ProductFormValues = {
  name: string;
  category: string;
  collection: string;
  price: string;
  image: string;
  description: string;
  stock: string;
};

type ProductFormProps = {
  productId?: string;
  initialValues: ProductFormValues;
};

export default function ProductForm({
  productId,
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [imagePath, setImagePath] = useState(initialValues.image);
  const [previewUrl, setPreviewUrl] = useState(initialValues.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isAllowedType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isAllowedType || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setSelectedFile(null);
      setError(PRODUCT_IMAGE_ERROR);
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function uploadSelectedImage(name: string) {
    if (!selectedFile) {
      return imagePath;
    }

    const uploadData = new FormData();
    uploadData.set("image", selectedFile);
    uploadData.set("name", name);

    const uploadResponse = await fetch("/api/admin/products/upload-image", {
      method: "POST",
      credentials: "include",
      body: uploadData,
    });
    const uploadPayload = (await uploadResponse.json().catch(() => null)) as {
      success?: boolean;
      image?: string;
      message?: string;
    } | null;

    if (!uploadResponse.ok || !uploadPayload?.image) {
      throw new Error(uploadPayload?.message || PRODUCT_IMAGE_ERROR);
    }

    return uploadPayload.image;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);

    let nextImage = imagePath;

    try {
      nextImage = await uploadSelectedImage(String(formData.get("name") ?? ""));
      setImagePath(nextImage);
    } catch (uploadError) {
      setPending(false);
      setError(
        uploadError instanceof Error ? uploadError.message : PRODUCT_IMAGE_ERROR
      );
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? ""),
      collection: String(formData.get("collection") ?? ""),
      price: Number(formData.get("price")),
      image: nextImage,
      description: String(formData.get("description") ?? ""),
      stock: Number(formData.get("stock")),
    };

    const response = await fetch(
      productId ? `/api/admin/products/${productId}` : "/api/admin/products",
      {
        method: productId ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    setPending(false);

    if (!response.ok) {
      setError(
        productId
          ? "Unable to update this product."
          : "Unable to add this product."
      );
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  const fieldClass =
    "mt-3 h-12 w-full border border-white/15 bg-saaq-void px-4 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold";

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Name</span>
        <input
          name="name"
          required
          defaultValue={initialValues.name}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Category</span>
        <input
          name="category"
          required
          defaultValue={initialValues.category}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Collection</span>
        <select
          name="collection"
          defaultValue={initialValues.collection}
          className={fieldClass}
        >
          <option value="Takeoff">Take Off</option>
          <option value="Gems">Gems</option>
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="saaq-eyebrow text-[9px]">Price (AED)</span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={initialValues.price}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="saaq-eyebrow text-[9px]">Stock</span>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={initialValues.stock}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="block">
        <span className="saaq-eyebrow text-[9px]">Product Image</span>
        <div className="mt-3 flex flex-wrap items-end gap-4">
          <div className="relative h-28 w-24 overflow-hidden border border-white/15 bg-saaq-void">
            {previewUrl ? (
              // Preview can be a blob URL or an existing public path.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <label className="saaq-btn saaq-transition inline-flex h-11 min-h-11 cursor-pointer items-center justify-center border border-saaq-gold bg-transparent px-5 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:bg-saaq-gold hover:text-saaq-black sm:px-6">
            {productId ? "Change Image" : "Choose Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
        </div>
        <input type="hidden" name="image" value={imagePath} />
      </div>

      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={initialValues.description}
          className="mt-3 w-full border border-white/15 bg-saaq-void px-4 py-3 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold"
        />
      </label>

      {error ? (
        <p className="border border-saaq-gold/25 bg-saaq-void px-4 py-3 font-sans text-sm text-saaq-ivory/80">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="saaq-btn saaq-transition inline-flex h-12 w-full items-center justify-center border border-saaq-gold bg-saaq-gold px-8 font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-60 sm:w-auto"
      >
        {pending
          ? "Saving"
          : productId
            ? "Save Changes"
            : "Add Product"}
      </button>
    </form>
  );
}
