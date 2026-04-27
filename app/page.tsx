import { getParticipants } from "@/lib/actions";
import RegistrationForm from "@/components/RegistrationForm";
import ParticipantsList from "@/components/ParticipantsList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const participants = await getParticipants();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Registration of participants</h1>
          <p className="text-sm text-gray-500">Turkmen-Chinese</p>
        </div>
        {/*<div className="text-sm text-gray-500">*/}
        {/*  Зарегистрировано: <span className="font-medium text-gray-900">{participants.length}</span>*/}
        {/*</div>*/}
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <RegistrationForm />
        {/*<ParticipantsList participants={participants} />*/}
      </div>
    </main>
  );
}
