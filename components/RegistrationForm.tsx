"use client";

import {useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {createParticipant} from "@/lib/actions";
import Badge from "./Badge";

export default function RegistrationForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [showPrint, setShowPrint] = useState(false);
    const [printData, setPrintData] = useState<{
        firstName: string;
        lastName: string;
        company: string;
        phone: string;
        email: string;
    } | null>(null);

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
            alert("Fill in your first and last name");
            return;
        }
        const data = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            company: company.trim(),
            phone: phone.trim(),
            email: email.trim(),
        };
        startTransition(async () => {
            await createParticipant(data);
            setPrintData(data);
            setShowPrint(true);
            reset();
            router.refresh();
        });
    }

    function handlePrint() {
        window.print();
    }

    function handleBack() {
        setShowPrint(false);
        setPrintData(null);
    }

    if (showPrint && printData) {
        return (
            <>
                <section className="bg-white rounded-lg border border-gray-200 p-6 no-print">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-lg font-medium">Print ready.</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <Badge {...printData} />
                        </div>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={handleBack}
                                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded font-medium hover:bg-gray-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex-1 bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600"
                            >
                                🖨️ Print
                            </button>
                        </div>
                    </div>
                </section>

                <div className="print-only hidden">
                    <Badge {...printData} />
                </div>
            </>
        );
    }

    return (
        <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">New member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">First name*</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="John"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Last name*</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Company (optional)</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder=""
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Phone (optional)</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="+993 12 345678"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email (optional)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="mail@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-800 disabled:opacity-50 transition"
                        >
                            {isPending ? "Saving..." : "Register"}
                        </button>
                    </div>
                    <div>
                        <div className="pt-2">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
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
                    </div>
                </div>


            </form>
        </section>
    );
}