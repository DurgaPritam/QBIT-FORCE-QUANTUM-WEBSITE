import { useState, type FormEvent } from "react";
import CloudinaryUploadField from "../../Components/admin/CloudinaryUploadField";
import type { PressMediaItem } from "../../api/types";
import { CaptionField, emptyPress, SortOrderField, TitleField } from "./adminFormDefaults";
import { AdminDataTable, AdminPageShell, deleteCrudItem, inputClass, saveCrudItem, useAdminList } from "./adminShared";
import { useAdminRefresh } from "./AdminLayout";

export default function AdminPress() {
  const { refreshKey } = useAdminRefresh();
  const { items, error, reload, setError } = useAdminList<PressMediaItem>("/admin/press", refreshKey);
  const [editing, setEditing] = useState<PressMediaItem | null>(null);
  const [editingOriginalId, setEditingOriginalId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);
    try {
      await saveCrudItem("/admin/press", editing, items, editingOriginalId);
      setEditing(null);
      setEditingOriginalId(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save press item");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this press item?")) return;
    setBusy(true);
    setError(null);
    try {
      await deleteCrudItem("/admin/press", id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete press item");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminPageShell title="Press & Media" count={items.length} error={error}>
      <button type="button" onClick={() => { setEditing(emptyPress()); setEditingOriginalId(null); }} className="mb-4 rounded-full bg-petal px-4 py-2 text-sm font-bold text-white">
        + Add press item
      </button>
      {editing && (
        <form onSubmit={save} className="mb-6 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2">
          <TitleField value={editing.title} onChange={(title) => setEditing({ ...editing, title })} />
          <SortOrderField value={editing.sortOrder} onChange={(sortOrder) => setEditing({ ...editing, sortOrder })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Category</label>
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as PressMediaItem["category"] })} className={inputClass}>
              {["facility", "events", "hardware", "team", "news"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <CaptionField value={editing.caption} onChange={(caption) => setEditing({ ...editing, caption })} />
          <CloudinaryUploadField value={editing.imageUrl} onChange={(imageUrl) => setEditing({ ...editing, imageUrl })} />
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
          <span key={`${item.id}-cap`} className="line-clamp-2 max-w-xs text-text-muted">{item.caption || "—"}</span>,
          <span key={item.id} className="space-x-2">
            <button type="button" onClick={() => { setEditing(item); setEditingOriginalId(item.id); }} className="font-semibold text-navy">Edit</button>
            <button type="button" onClick={() => remove(item.id)} className="font-semibold text-petal">Delete</button>
          </span>,
        ])}
      />
    </AdminPageShell>
  );
}
