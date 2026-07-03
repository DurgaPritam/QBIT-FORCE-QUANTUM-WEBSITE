import { useState, type FormEvent } from "react";
import CloudinaryUploadField from "../../Components/admin/CloudinaryUploadField";
import type { Article } from "../../api/types";
import { CaptionField, emptyArticle, SlugField, SortOrderField, TitleField } from "./adminFormDefaults";
import { AdminDataTable, AdminPageShell, deleteCrudItem, inputClass, saveCrudItem, useAdminList } from "./adminShared";
import { useAdminRefresh } from "./AdminLayout";

export default function AdminPublications() {
  const { refreshKey } = useAdminRefresh();
  const { items, error, reload } = useAdminList<Article>("/admin/publications", refreshKey);
  const [editing, setEditing] = useState<Article | null>(null);
  const [editingOriginalId, setEditingOriginalId] = useState<string | null>(null);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveCrudItem("/admin/publications", editing, items, editingOriginalId);
    setEditing(null);
    setEditingOriginalId(null);
    await reload();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this publication?")) return;
    await deleteCrudItem("/admin/publications", id);
    await reload();
  };

  return (
    <AdminPageShell title="Publications" count={items.length} error={error}>
      <button type="button" onClick={() => { setEditing(emptyArticle()); setEditingOriginalId(null); }} className="mb-4 rounded-full bg-petal px-4 py-2 text-sm font-bold text-white">
        + Add publication
      </button>
      {editing && (
        <form onSubmit={save} className="mb-6 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2">
          <SlugField value={editing.id} onChange={(id) => setEditing({ ...editing, id })} placeholder="e.g. a5" />
          <SortOrderField value={editing.sortOrder} onChange={(sortOrder) => setEditing({ ...editing, sortOrder })} />
          <TitleField value={editing.title} onChange={(title) => setEditing({ ...editing, title })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Date</label>
            <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
          </div>
          <CaptionField value={editing.excerpt} onChange={(excerpt) => setEditing({ ...editing, excerpt })} />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Author</label>
            <input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Read time</label>
            <input value={editing.readTime} onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">Link</label>
            <input value={editing.link ?? ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} className={inputClass} />
          </div>
          <CloudinaryUploadField label="Cover image" value={editing.imageUrl ?? ""} onChange={(imageUrl) => setEditing({ ...editing, imageUrl })} />
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className="rounded-full bg-navy px-4 py-2 text-sm text-white">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-full border px-4 py-2 text-sm">Cancel</button>
          </div>
        </form>
      )}
      <AdminDataTable
        headers={["Order", "Slug", "Title", "Caption", "Actions"]}
        rows={items.map((item) => [
          item.sortOrder ?? "—",
          <span key={`${item.id}-slug`} className="font-mono text-xs text-text-muted">{item.id}</span>,
          item.title,
          <span key={`${item.id}-cap`} className="line-clamp-2 max-w-xs text-text-muted">{item.excerpt || "—"}</span>,
          <span key={item.id} className="space-x-2">
            <button type="button" onClick={() => { setEditing(item); setEditingOriginalId(item.id); }} className="font-semibold text-navy">Edit</button>
            <button type="button" onClick={() => remove(item.id)} className="font-semibold text-petal">Delete</button>
          </span>,
        ])}
      />
    </AdminPageShell>
  );
}
