"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { deleteParticipant } from "@/lib/actions";
import type { Participant } from "@/lib/categories";

export default function ParticipantsList({ participants }: { participants: Participant[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return participants.filter((p) => {
      return (
          !q ||
          `${p.first_name} ${p.last_name} ${p.company ?? ""} ${p.phone ?? ""} ${p.email ?? ""}`
              .toLowerCase()
              .includes(q)
      );
    });
  }, [participants, search]);

  function handleDelete(id: string) {
    if (!confirm("Удалить участника?")) return;
    startTransition(async () => {
      await deleteParticipant(id);
      router.refresh();
    });
  }

  function exportCsv() {
    const rows = [["Имя", "Фамилия", "Компания", "Телефон", "Email", "Дата"]];
    participants.forEach((p) => {
      rows.push([
        p.first_name,
        p.last_name,
        p.company ?? "",
        p.phone ?? "",
        p.email ?? "",
        new Date(p.created_at).toLocaleString("ru-RU"),
      ]);
    });

    const csv =
        "\ufeff" +
        rows
            .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
            .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "participants.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Участники</h2>
          <button
              onClick={exportCsv}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
          >
            Экспорт CSV
          </button>
        </div>

        <input
            type="text"
            placeholder="Поиск по имени, компании, контактам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="border border-gray-200 rounded divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">Никого нет</div>
          ) : (
              filtered.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {p.first_name} {p.last_name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {[p.company, p.phone, p.email].filter(Boolean).join(" · ")}
                      </div>
                    </div>

                    {/* ВОТ ТУТ БЫЛА ОШИБКА */}
                    <a
                        href={`/print/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Печать
                    </a>

                    <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      ×
                    </button>
                  </div>
              ))
          )}
        </div>
      </section>
  );
}