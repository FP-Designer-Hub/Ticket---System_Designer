import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { DesignerCard } from "@/components/DesignerCard";
import { RequestsTable } from "@/components/RequestsTable";
import { getDesigners, getTasks } from "@/utils/mockData";

export default function Dashboard() {
  const [designers] = useState(getDesigners());
  const [tasks] = useState(getTasks());

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Designer Availability Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Designer Availability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designers.map((designer) => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>
        </section>

        {/* Requests Table Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Requests
          </h2>
          <RequestsTable tasks={tasks} />
        </section>
      </div>
    </MainLayout>
  );
}
