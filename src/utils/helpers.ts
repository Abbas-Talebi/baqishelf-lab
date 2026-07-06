export const statusMap: Record<string, string> = {
  // مشترک
  planned: "📋 در صف / برنامه",
  dropped: "✕ رها شده",
  // بازی
  completed: "✓ تکمیل شده",
  playing: "🎮 در حال تجربه",
  backlog: "📚 در صف",
  paused: "⏸ متوقف شده",
  // فیلم و سریال
  watched: "✓ تماشا شده",
  watching: "🎬 در حال تماشا",
  // کتاب
  reading: "📖 در حال مطالعه",
  // موسیقی
  listened: "✓ شنیده شده",
  listening: "🎧 در حال شنیدن",
};

export function getStatusLabel(status: string): string {
  return statusMap[status] || status;
}

export function formatDate(date?: Date | null): string {
  if (!date) return "نامشخص";
  return date.toLocaleDateString("fa-IR");
}