import { useEffect, useState } from "react";
import {
  HiOutlineMail,
  HiOutlineMailOpen,
  HiOutlineTrash,
  HiOutlineX,
} from "react-icons/hi";
import { apiRequest } from "../../api/client";
import type { ContactSubmission } from "../../api/types";
import { useAdminRefresh } from "./AdminLayout";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AdminContacts() {
  const { refreshKey } = useAdminRefresh();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    setError(null);
    apiRequest<ContactSubmission[]>("/admin/contacts", { auth: true })
      .then(setContacts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load inbox"));
  }, [refreshKey]);

  const unreadCount = contacts.filter((c) => !c.read).length;

  const setReadState = async (contact: ContactSubmission, read: boolean) => {
    setBusyId(contact.id);
    setError(null);
    try {
      await apiRequest(`/admin/contacts/${contact.id}/read?read=${read}`, {
        method: "PATCH",
        auth: true,
      });
      setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, read } : c)));
      setSelected((s) => (s && s.id === contact.id ? { ...s, read } : s));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update message");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (contact: ContactSubmission) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    setBusyId(contact.id);
    setError(null);
    try {
      await apiRequest(`/admin/contacts/${contact.id}`, { method: "DELETE", auth: true });
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      setSelected((s) => (s && s.id === contact.id ? null : s));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setBusyId(null);
    }
  };

  const openMessage = (contact: ContactSubmission) => {
    setSelected(contact);
    if (!contact.read) void setReadState(contact, true);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-4 sm:mb-6">
        <h1 className="font-display text-xl font-bold text-navy sm:text-2xl">Inbox</h1>
        <p className="text-sm text-text-muted">
          {contacts.length} messages
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-petal/10 px-2 py-0.5 text-xs font-semibold text-petal">
              {unreadCount} unread
            </span>
          )}
        </p>
      </header>

      {error && (
        <p className="mb-4 rounded-xl border border-petal/30 bg-petal/5 px-4 py-3 text-sm text-petal">{error}</p>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {contacts.length === 0 ? (
          <p className="p-8 text-center text-sm text-text-muted">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {contacts.map((c) => (
              <li key={c.id} className={`flex items-stretch ${c.read ? "" : "bg-petal/5"}`}>
                <button
                  type="button"
                  onClick={() => openMessage(c)}
                  className="flex min-w-0 flex-1 items-start gap-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:gap-4 sm:px-5"
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/10 font-bold text-navy">
                    {initials(c.name)}
                    {!c.read && (
                      <span
                        className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-petal"
                        aria-label="Unread"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className={`truncate text-navy ${c.read ? "font-medium" : "font-bold"}`}>{c.name}</p>
                      <time className="shrink-0 text-xs text-text-muted">
                        {new Date(c.createdAt).toLocaleString()}
                      </time>
                    </div>
                    <p className="truncate text-sm text-text-muted">{c.email}</p>
                    <p className={`mt-1 truncate text-sm ${c.read ? "text-navy/70" : "text-navy"}`}>
                      <span className="font-medium">{c.inquiryType}</span>
                      {c.message ? ` — ${c.message}` : ""}
                    </p>
                  </div>
                </button>
                <div className="flex shrink-0 items-center gap-1 pr-3">
                  <button
                    type="button"
                    onClick={() => setReadState(c, !c.read)}
                    disabled={busyId === c.id}
                    className="rounded-lg p-2 text-text-muted transition hover:bg-slate-100 hover:text-navy disabled:opacity-40"
                    aria-label={c.read ? "Mark as unread" : "Mark as read"}
                    title={c.read ? "Mark as unread" : "Mark as read"}
                  >
                    {c.read ? <HiOutlineMail className="text-lg" /> : <HiOutlineMailOpen className="text-lg" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(c)}
                    disabled={busyId === c.id}
                    className="rounded-lg p-2 text-text-muted transition hover:bg-petal/10 hover:text-petal disabled:opacity-40"
                    aria-label="Delete message"
                    title="Delete message"
                  >
                    <HiOutlineTrash className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border bg-slate-50 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {initials(selected.name)}
                </div>
                <div>
                  <h2 id="contact-modal-title" className="font-display text-lg font-bold text-navy">
                    {selected.name}
                  </h2>
                  <p className="text-sm text-text-muted">{selected.email}</p>
                  <p className="text-xs text-text-muted">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full p-2 text-navy hover:bg-white"
                aria-label="Close"
              >
                <HiOutlineX className="text-xl" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto px-5 py-5">
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-text-muted">Phone</p>
                  <p className="mt-1 text-navy">{selected.phone || "—"}</p>
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-text-muted">Company</p>
                  <p className="mt-1 text-navy">{selected.company || "—"}</p>
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-4 py-3 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase text-text-muted">Inquiry type</p>
                  <p className="mt-1 text-navy">{selected.inquiryType}</p>
                </div>
              </div>

              <div className="rounded-xl border border-border px-4 py-4">
                <p className="text-xs font-semibold uppercase text-text-muted">Message</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-navy">{selected.message}</p>
              </div>

              <p className="text-xs text-text-muted">
                Email notification: {selected.emailSent ? "Sent successfully" : "Pending or failed"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.inquiryType)}`}
                className="inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-petal"
              >
                Reply via email
              </a>
              <button
                type="button"
                onClick={() => setReadState(selected, !selected.read)}
                disabled={busyId === selected.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-navy disabled:opacity-40"
              >
                {selected.read ? <HiOutlineMail className="text-base" /> : <HiOutlineMailOpen className="text-base" />}
                Mark as {selected.read ? "unread" : "read"}
              </button>
              <button
                type="button"
                onClick={() => remove(selected)}
                disabled={busyId === selected.id}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-petal/30 px-4 py-2.5 text-sm font-semibold text-petal transition hover:bg-petal/5 disabled:opacity-40"
              >
                <HiOutlineTrash className="text-base" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
