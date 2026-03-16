import { getHiburanById } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import EditHiburanForm from "./EditHiburanForm";

export default async function EditHiburanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  
  if (isNaN(id)) {
    notFound();
  }

  const item = await getHiburanById(id);

  if (!item) {
    notFound();
  }

  // Cast item to the expected type for the form
  const formattedItem = {
    tipe: (item.tipe as string) || "",
    nama: (item.nama as string) || "",
    link: (item.link as string) || "",
    pemilik: (item.pemilik as string) || "",
    status: (item.status as string) || "belummulai",
    komentar: (item.komentar as string) || "",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Edit Hiburan</h1>
        <EditHiburanForm id={id} item={formattedItem} />
      </div>
    </main>
  );
}
