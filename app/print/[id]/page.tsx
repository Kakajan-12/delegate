import { notFound } from "next/navigation";
import { getParticipant } from "@/lib/actions";
import Badge from "@/components/Badge";
import PrintTrigger from "@/components/PrintTrigger";

export const dynamic = "force-dynamic";

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const p = await getParticipant(id);
    if (!p) notFound();

    return (
        <div className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
            <PrintTrigger />
            <div className="print-area">
                <Badge
                    firstName={p.first_name}
                    lastName={p.last_name}
                    company={p.company}
                    phone={p.phone}
                    email={p.email}
                />
            </div>
        </div>
    );
}