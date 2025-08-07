import DashboardLayout from '@/components/dashboard/DashboardLayout';
import HistoryTable from '@/components/dashboard/HistoryTable';

const History = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Historial de Riegos</h1>
          <p className="text-muted-foreground">
            Registro completo de eventos de riego automático y manual del sistema CitriFlow
          </p>
        </div>
        
        <HistoryTable />
      </div>
    </DashboardLayout>
  );
};

export default History;