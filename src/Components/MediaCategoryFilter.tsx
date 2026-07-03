import { mediaCategories } from "../data/mediaCategories";

type Props = {
  value: string;
  onChange: (category: string) => void;
  counts?: Partial<Record<string, number>>;
  className?: string;
};

export default function MediaCategoryFilter({ value, onChange, counts, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
      {mediaCategories.map((cat) => {
        const active = value === cat.id;
        const count = counts?.[cat.id];
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`cursor-pointer rounded-full border-2 px-3 py-1.5 font-display text-[0.6875rem] font-bold uppercase tracking-wider transition sm:px-4 sm:py-2 sm:text-xs ${
              active
                ? "border-navy bg-navy text-white shadow-md"
                : "border-border bg-white text-navy hover:border-navy/30 hover:bg-[#fafbff]"
            }`}
          >
            {cat.label}
            {count !== undefined && (
              <span className={`ml-1.5 ${active ? "text-white/70" : "text-text-muted"}`}>({count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
