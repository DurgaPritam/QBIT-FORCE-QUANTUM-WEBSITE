import { useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function CloudinaryUploadField({ value, onChange, label = "Image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const { uploadToCloudinary } = await import("../../api/client");
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err) {
      const msg =
        err instanceof Error && err.message && err.message !== "Request failed"
          ? err.message
          : "Upload failed. Check file size (max 15 MB) and try again.";
      setError(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
        />
        <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-navy/20 bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-petal">
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {value && (
        <img src={value} alt="" className="h-20 w-20 rounded-lg border border-border object-cover" />
      )}
      {error && <p className="text-xs text-petal">{error}</p>}
    </div>
  );
}
