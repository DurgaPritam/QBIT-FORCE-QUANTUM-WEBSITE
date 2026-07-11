export function MediaLoadState({
  loading,
  error,
  empty,
  emptyMessage,
}: {
  loading: boolean;
  error: string | null;
  empty: boolean;
  emptyMessage: string;
}) {
  if (loading) {
    return (
      <p className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-sm text-text-muted">
        Loading…
      </p>
    );
  }
  if (error) {
    return (
      <p className="rounded-2xl border border-petal/30 bg-petal/5 px-6 py-12 text-center text-sm text-petal">
        {error}
      </p>
    );
  }
  if (empty) {
    return (
      <p className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-sm text-text-muted">
        {emptyMessage}
      </p>
    );
  }
  return null;
}
