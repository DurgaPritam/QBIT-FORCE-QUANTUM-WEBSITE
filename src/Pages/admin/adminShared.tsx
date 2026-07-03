import { useEffect, useState, type ReactNode } from "react";

export const inputClass = "rounded-lg border border-border px-3 py-2 text-sm w-full";

export function AdminPageShell({
  title,
  count,
  error,
  children,
  subtitle,
}: {
  title: string;
  count?: number;
  error: string | null;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-4 sm:mb-6">
        <h1 className="font-display text-xl font-bold text-navy sm:text-2xl">{title}</h1>
        <p className="text-sm text-text-muted">
          {subtitle ?? (count !== undefined ? `${count} items · lower display order appears first` : "")}
        </p>
      </header>
      {error && (
        <p className="mb-4 rounded-xl border border-petal/30 bg-petal/5 px-4 py-3 text-sm text-petal">{error}</p>
      )}
      <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function AdminDataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  if (rows.length === 0) {
    return <p className="py-6 text-center text-sm text-text-muted">No items yet.</p>;
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <div key={i} className="rounded-xl border border-border bg-slate-50/80 p-3">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`py-2 ${j < row.length - 1 ? "border-b border-border/70" : ""}`}
              >
                <p className="text-[0.625rem] font-bold uppercase tracking-wider text-text-muted">{headers[j]}</p>
                <div className="mt-1 text-sm text-navy">{cell}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b text-xs uppercase text-text-muted">
            <tr>
              {headers.map((h) => (
                <th key={h} className="p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b">
                {row.map((cell, j) => (
                  <td key={j} className="p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function useAdminList<T extends { sortOrder?: number }>(
  path: string,
  refreshKey: number,
) {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    const { apiRequest } = await import("../../api/client");
    const data = await apiRequest<T[]>(path, { auth: true });
    setItems([...data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
  };

  useEffect(() => {
    setError(null);
    reload().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [refreshKey, path]);

  return { items, error, reload, setError };
}

export async function saveCrudItem<T extends { id: string }>(
  path: string,
  item: T,
  existing: T[],
  originalId: string | null,
) {
  const { apiRequest } = await import("../../api/client");
  const slug = item.id.trim();

  if (originalId) {
    await apiRequest(`${path}/${encodeURIComponent(originalId)}`, {
      method: "PUT",
      body: { ...item, id: slug },
      auth: true,
    });
    return;
  }

  const isNew = !existing.some((e) => e.id === slug);
  if (isNew) {
    await apiRequest(path, { method: "POST", body: { ...item, id: slug }, auth: true });
  } else {
    await apiRequest(`${path}/${encodeURIComponent(slug)}`, {
      method: "PUT",
      body: { ...item, id: slug },
      auth: true,
    });
  }
}

export async function deleteCrudItem(path: string, id: string) {
  const { apiRequest } = await import("../../api/client");
  await apiRequest(`${path}/${id}`, { method: "DELETE", auth: true });
}
