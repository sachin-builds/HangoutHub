"use client";

import { useState } from "react";

import { uploadCafeImage } from "@/services/upload.service";

interface CafeFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function CafeForm({
  initialData,
  onSubmit,
}: CafeFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    address: initialData?.address ?? "",
    city: initialData?.city ?? "",
    latitude: initialData?.latitude ?? "",
    longitude: initialData?.longitude ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    averageCost: initialData?.averageCost ?? "",
    wifi: initialData?.wifi ?? true,
    powerSockets:
      initialData?.powerSockets ?? true,
    noiseLevel:
      initialData?.noiseLevel ?? 3,
    isOpen: initialData?.isOpen ?? true,
    openingTime:
      initialData?.openingTime ?? "",
    closingTime:
      initialData?.closingTime ?? "",
    priceRange:
      initialData?.priceRange ?? "LOW",
  });

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  function handleChange(
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm({
        ...form,
        [name]: (
          e.target as HTMLInputElement
        ).checked,
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        setUploading(true);

        imageUrl = await uploadCafeImage(
          imageFile
        );
      }

      const payload: any = {
        ...form,

        imageUrl,

        latitude: Number(form.latitude),

        longitude: Number(
          form.longitude
        ),

        averageCost: Number(
          form.averageCost
        ),

        noiseLevel: Number(
          form.noiseLevel
        ),
      };

      if (!payload.imageUrl) {
        delete payload.imageUrl;
      }

      await onSubmit(payload);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow"
    >
      <input
        name="name"
        placeholder="Cafe Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="rounded-xl border p-3"
        />

        <input
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="rounded-xl border p-3"
        />
      </div>

      {/* Image Upload */}

      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (
              e.target.files &&
              e.target.files.length > 0
            ) {
              setImageFile(
                e.target.files[0]
              );
            }
          }}
          className="w-full rounded-xl border p-3"
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Cafe"
            className="h-44 w-full rounded-xl object-cover"
          />
        )}
      </div>

      <input
        name="averageCost"
        placeholder="Average Cost"
        value={form.averageCost}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="openingTime"
          placeholder="Opening Time"
          value={form.openingTime}
          onChange={handleChange}
          className="rounded-xl border p-3"
        />

        <input
          name="closingTime"
          placeholder="Closing Time"
          value={form.closingTime}
          onChange={handleChange}
          className="rounded-xl border p-3"
        />
      </div>

      <select
        name="priceRange"
        value={form.priceRange}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      >
        <option value="LOW">
          LOW
        </option>

        <option value="MID">
          MID
        </option>

        <option value="PREMIUM">
          PREMIUM
        </option>
      </select>

      <input
        name="noiseLevel"
        placeholder="Noise Level"
        value={form.noiseLevel}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="wifi"
          checked={form.wifi}
          onChange={handleChange}
        />
        WiFi
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="powerSockets"
          checked={form.powerSockets}
          onChange={handleChange}
        />
        Power Sockets
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isOpen"
          checked={form.isOpen}
          onChange={handleChange}
        />
        Open
      </label>

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-xl bg-amber-700 py-3 text-white hover:bg-amber-800 disabled:opacity-50"
      >
        {uploading
          ? "Uploading Image..."
          : "Save Cafe"}
      </button>
    </form>
  );
}