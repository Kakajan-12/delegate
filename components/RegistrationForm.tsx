"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createParticipant } from "@/lib/actions";
import Badge from "./Badge";

export default function RegistrationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function reset() {
    setFirstName("");
    setLastName("");
    setCompany("");
    setPhone("");
    setEmail("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      alert("Заполните имя и фамилию");
      return;
    }
    startTransition(async () => {
      const { id } = await createParticipant({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        company: company.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      reset();
      window.open(`/print/${id}`, "_blank");
      router.refresh();
    });
  }

  return (
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium mb-4">Новый участник</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Имя *</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Иван"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Фамилия *</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Иванов"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Компания (необязательно)</label>
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Acme Inc."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Телефон (необязательно)</label>
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+993 12 345678"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email (необязательно)</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ivan@example.com"
            />
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-600 mb-2">Предпросмотр:</p>
            <div className="bg-gray-50 p-4 rounded flex justify-center">
              <Badge
                  firstName={firstName}
                  lastName={lastName}
                  company={company}
                  phone={phone}
                  email={email}
              />
            </div>
          </div>

          <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-900 text-white py-2.5 rounded font-medium hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {isPending ? "Сохраняю..." : "Зарегистрировать и распечатать"}
          </button>
        </form>
      </section>
  );
}