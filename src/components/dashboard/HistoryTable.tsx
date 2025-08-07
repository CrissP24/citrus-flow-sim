import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Droplets, 
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import { getSystemData, IrrigationRecord } from '@/utils/dataManager';

const HistoryTable = () => {
  const [records, setRecords] = useState<IrrigationRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<IrrigationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'manual' | 'automatic'>('all');

  useEffect(() => {
    const loadData = () => {
      const data = getSystemData();
      setRecords(data.irrigationHistory);
    };

    loadData();
    const interval = setInterval(loadData, 10000); // Actualizar cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = records;

    // Filtrar por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter(record => record.type === typeFilter);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(record => 
        new Date(record.timestamp).toLocaleDateString('es-ES').includes(searchTerm) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
  }, [records, searchTerm, typeFilter]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeVariant = (type: string) => {
    return type === 'automatic' ? 'default' : 'secondary';
  };

  const getTypeBadge = (type: string) => {
    return type === 'automatic' ? '🤖 Automático' : '👤 Manual';
  };

  const exportToCSV = () => {
    const headers = ['Fecha', 'Hora', 'Tipo', 'Humedad (%)', 'Temperatura (°C)', 'Estado Bomba', 'Duración (min)'];
    const csvData = filteredRecords.map(record => [
      formatDate(record.timestamp),
      formatTime(record.timestamp),
      record.type === 'automatic' ? 'Automático' : 'Manual',
      record.humidity,
      record.temperature,
      record.pumpStatus ? 'Activa' : 'Inactiva',
      record.duration || 'N/A'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `historial_riego_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTotalEvents = () => filteredRecords.length;
  const getAutomaticEvents = () => filteredRecords.filter(r => r.type === 'automatic').length;
  const getManualEvents = () => filteredRecords.filter(r => r.type === 'manual').length;
  const getAvgHumidity = () => {
    const avg = filteredRecords.reduce((sum, r) => sum + r.humidity, 0) / filteredRecords.length;
    return filteredRecords.length > 0 ? Math.round(avg) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-natural">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-nature p-2 rounded-lg">
                <History className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Eventos</p>
                <p className="text-2xl font-bold">{getTotalEvents()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-natural">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-water p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automáticos</p>
                <p className="text-2xl font-bold">{getAutomaticEvents()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-natural">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-earth p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Manuales</p>
                <p className="text-2xl font-bold">{getManualEvents()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-natural">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Humedad Prom.</p>
                <p className="text-2xl font-bold">{getAvgHumidity()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de historial */}
      <Card className="shadow-natural">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5 text-primary" />
              <span>Historial de Riegos</span>
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por fecha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-48"
                />
              </div>

              {/* Filtro por tipo */}
              <div className="flex space-x-2">
                <Button
                  variant={typeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('all')}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Todos
                </Button>
                <Button
                  variant={typeFilter === 'automatic' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('automatic')}
                >
                  🤖 Auto
                </Button>
                <Button
                  variant={typeFilter === 'manual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('manual')}
                >
                  👤 Manual
                </Button>
              </div>

              {/* Exportar */}
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Fecha</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-20">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Hora</span>
                    </div>
                  </TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-center">Humedad</TableHead>
                  <TableHead className="text-center">Temperatura</TableHead>
                  <TableHead className="text-center">Estado Bomba</TableHead>
                  <TableHead className="text-center">Duración</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No hay registros de riego disponibles</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {formatDate(record.timestamp)}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {formatTime(record.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeVariant(record.type)} className="text-xs">
                          {getTypeBadge(record.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-medium ${
                          record.humidity < 30 ? 'text-destructive' : 'text-foreground'
                        }`}>
                          {record.humidity}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">
                          {record.temperature}°C
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={record.pumpStatus ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {record.pumpStatus ? '🟢 Activa' : '🔴 Inactiva'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {record.duration ? `${record.duration} min` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryTable;