import { useState, type FormEvent } from "react";
import CloudinaryUploadField from "../../Components/admin/CloudinaryUploadField";
import type { VideoItem } from "../../api/types";
import { CaptionField, emptyVideo, SortOrderField, TitleField } from "./adminFormDefaults";
import { AdminDataTable, AdminPageShell, deleteCrudItem, inputClass, saveCrudItem, useAdminList } from "./adminShared";
import { useAdminRefresh } from "./AdminLayout";

export default function AdminVideos() {
  const { refreshKey } = useAdminRefresh();
  const { items, error, reload, setError } = useAdminList<VideoItem>("/admin/videos", refreshKey);
  const [editing, setEditing] = useState<VideoItem | null>(null);
  const [editingOriginalId, setEditingOriginalId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);
    try {
      await saveCrudItem("/admin/videos", editing, items, editingOriginalId);
      setEditing(null);
      setEditingOriginalId(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save video");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this video?")) return;
    setBusy(true);
    setError(null);
    try {
      await deleteCrudItem("/admin/videos", id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete video");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminPageShell title="Videos" count={items.length} error={error}>
      <button type="button" onClick={() => { setEditing(emptyVideo()); setEditingOriginalId(null); }} className="mb-4 rounded-full bg-petal px-4 py-2 text-sm font-bold text-white">
        + Add video
      </button>
      {editing && (
        <form onSubmit={save} className="mb-6 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2">
          <TitleField value={editing.title} onChange={(title) => setEditing({ ...editing, title })} />
          <SortOrderField value={editing.sortOrder} onChange={(sortOrder) => setEditing({ ...editing, sortOrder })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Duration</label>
            <input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="e.g. 3 min" className={inputClass} />
          </div>
          <CaptionField value={editing.description} onChange={(description) => setEditing({ ...editing, description })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Category</label>
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as VideoItem["category"] })} className={inputClass}>
              {["facility", "technology", "events", "education"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">YouTube ID</label>
            <input value={editing.youtubeId ?? ""} onChange={(e) => setEditing({ ...editing, youtubeId: e.target.value })} placeholder="Optional" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Video URL</label>
            <input value={editing.src ?? ""} onChange={(e) => setEditing({ ...editing, src: e.target.value })} placeholder="Cloudinary or direct URL" className={inputClass} />
          </div>
          <CloudinaryUploadField label="Thumbnail" value={editing.thumbnail ?? ""} onChange={(thumbnail) => setEditing({ ...editing, thumbnail })} />
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" disabled={busy} className="rounded-full bg-navy px-4 py-2 text-sm text-white disabled:opacity-50">Save</button>
            <button type="button" onClick={() => { setEditing(null); setEditingOriginalId(null); }} className="rounded-full border px-4 py-2 text-sm">Cancel</button>
          </div>
        </form>
      )}
      <AdminDataTable
        headers={["Order", "Title", "Caption", "Actions"]}
        rows={items.map((item) => [
          item.sortOrder ?? "—",
          item.title,
          <span key={`${item.id}-cap`} className="line-clamp-2 max-w-xs text-text-muted">{item.description || "—"}</span>,
          <span key={item.id} className="space-x-2">
            <button type="button" onClick={() => { setEditing(item); setEditingOriginalId(item.id); }} className="font-semibold text-navy">Edit</button>
            <button type="button" onClick={() => remove(item.id)} className="font-semibold text-petal">Delete</button>
          </span>,
        ])}
      />
    </AdminPageShell>
  );
}
