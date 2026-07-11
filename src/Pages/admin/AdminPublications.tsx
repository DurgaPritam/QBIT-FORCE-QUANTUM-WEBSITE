import { useState, type FormEvent } from "react";
import CloudinaryUploadField from "../../Components/admin/CloudinaryUploadField";
import type { Article } from "../../api/types";
import { CaptionField, emptyArticle, SortOrderField, TitleField } from "./adminFormDefaults";
import { AdminDataTable, AdminPageShell, deleteCrudItem, inputClass, saveCrudItem, useAdminList } from "./adminShared";
import { useAdminRefresh } from "./AdminLayout";

export default function AdminPublications() {
  const { refreshKey } = useAdminRefresh();
  const { items, error, reload, setError } = useAdminList<Article>("/admin/publications", refreshKey);
  const [editing, setEditing] = useState<Article | null>(null);
  const [editingOriginalId, setEditingOriginalId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);
    try {
      await saveCrudItem("/admin/publications", editing, items, editingOriginalId);
      setEditing(null);
      setEditingOriginalId(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save publication");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this publication?")) return;
    setBusy(true);
    setError(null);
    try {
      await deleteCrudItem("/admin/publications", id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete publication");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminPageShell title="Publications" count={items.length} error={error}>
      <button
        type="button"
        onClick={() => {
          setEditing(emptyArticle());
          setEditingOriginalId(null);
        }}
        className="mb-4 rounded-full bg-petal px-4 py-2 text-sm font-bold text-white"
      >
        + Add publication
      </button>
      {editing && (
        <form onSubmit={save} className="mb-6 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2">
          <TitleField value={editing.title} onChange={(title) => setEditing({ ...editing, title })} />
          <SortOrderField value={editing.sortOrder} onChange={(sortOrder) => setEditing({ ...editing, sortOrder })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Category</label>
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value as Article["category"] })}
              className={inputClass}
            >
              {["publication", "press", "insight"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Date</label>
            <input
              type="date"
              value={editing.date}
              onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              className={inputClass}
            />
          </div>
          <CaptionField value={editing.excerpt} onChange={(excerpt) => setEditing({ ...editing, excerpt })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Author</label>
            <input
              value={editing.author ?? ""}
              onChange={(e) => setEditing({ ...editing, author: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Read time</label>
            <input
              value={editing.readTime}
              onChange={(e) => setEditing({ ...editing, readTime: e.target.value })}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={Boolean(editing.featured)}
              onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
            />
            Featured on site
          </label>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Link</label>
            <input
              value={editing.link ?? ""}
              onChange={(e) => setEditing({ ...editing, link: e.target.value })}
              className={inputClass}
            />
          </div>
          <CloudinaryUploadField
            label="Cover image"
            value={editing.imageUrl ?? ""}
            onChange={(imageUrl) => setEditing({ ...editing, imageUrl })}
          />
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" disabled={busy} className="rounded-full bg-navy px-4 py-2 text-sm text-white disabled:opacity-50">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setEditingOriginalId(null);
              }}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <AdminDataTable
        headers={["Order", "Title", "Category", "Featured", "Actions"]}
        rows={items.map((item) => [
          item.sortOrder ?? "—",
          item.title,
          item.category,
          item.featured ? "Yes" : "No",
          <span key={item.id} className="space-x-2">
            <button
              type="button"
              onClick={() => {
                setEditing(item);
                setEditingOriginalId(item.id);
              }}
              className="font-semibold text-navy"
            >
              Edit
            </button>
            <button type="button" onClick={() => remove(item.id)} className="font-semibold text-petal">
              Delete
            </button>
          </span>,
        ])}
      />
    </AdminPageShell>
  );
}
