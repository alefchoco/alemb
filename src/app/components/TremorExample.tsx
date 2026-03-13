/**
 * Example: Enhanced Dashboard with Tremor Components
 * 
 * This file demonstrates how to use Tremor components for a more
 * professional dashboard look. Uncomment to use.
 */

import { Card, AreaChart, BarChart, DonutChart, Metric, Text, Flex, BadgeDelta, Grid } from '@tremor/react';

// Example data for Shield-Master metrics
const threatsOverTime = [
  { date: '2026-03-01', threats: 12, blocked: 12 },
  { date: '2026-03-02', threats: 8, blocked: 8 },
  { date: '2026-03-03', threats: 15, blocked: 14 },
  { date: '2026-03-04', threats: 6, blocked: 6 },
  { date: '2026-03-05', threats: 23, blocked: 22 },
  { date: '2026-03-06', threats: 10, blocked: 10 },
  { date: '2026-03-07', threats: 18, blocked: 18 },
];

const threatsByType = [
  { name: 'Malware', value: 45 },
  { name: 'Phishing', value: 32 },
  { name: 'Ransomware', value: 15 },
  { name: 'Spyware', value: 8 },
];

const scanResults = [
  { category: 'Archivos Escaneados', value: 45234 },
  { category: 'Amenazas Detectadas', value: 156 },
  { category: 'Archivos Limpios', value: 45078 },
  { category: 'En Cuarentena', value: 23 },
];

export function TremorDashboardExample() {
  return (
    <div className="p-6 space-y-6 bg-black">
      {/* KPI Cards */}
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-400">Salud del Sistema</Text>
          <Metric className="text-green-400">94%</Metric>
          <Flex className="mt-2">
            <BadgeDelta deltaType="increase">+2.3%</BadgeDelta>
          </Flex>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-400">Amenazas Bloqueadas</Text>
          <Metric className="text-red-400">156</Metric>
          <Flex className="mt-2">
            <BadgeDelta deltaType="moderateDecrease">-12.5%</BadgeDelta>
          </Flex>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-400">Archivos Escaneados</Text>
          <Metric className="text-blue-400">45.2K</Metric>
          <Flex className="mt-2">
            <BadgeDelta deltaType="increase">+8.7%</BadgeDelta>
          </Flex>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-400">Protección Activa</Text>
          <Metric className="text-green-400">Activa</Metric>
          <Flex className="mt-2">
            <Text className="text-green-400">Todos los módulos</Text>
          </Flex>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid numItemsSm={1} numItemsLg={2} className="gap-4">
        {/* Threats Over Time */}
        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-300 text-lg font-semibold mb-4">
            Amenazas en el Tiempo
          </Text>
          <AreaChart
            className="h-72"
            data={threatsOverTime}
            index="date"
            categories={["threats", "blocked"]}
            colors={["red", "emerald"]}
            valueFormatter={(value) => `${value} amenazas`}
            showLegend={true}
            showGridLines={false}
            showAnimation={true}
          />
        </Card>

        {/* Threats by Type */}
        <Card className="bg-gray-900 border-gray-800">
          <Text className="text-gray-300 text-lg font-semibold mb-4">
            Amenazas por Tipo
          </Text>
          <DonutChart
            className="h-72"
            data={threatsByType}
            category="value"
            index="name"
            colors={["red", "orange", "amber", "yellow"]}
            valueFormatter={(value) => `${value} amenazas`}
            showAnimation={true}
          />
        </Card>

        {/* Scan Results Bar Chart */}
        <Card className="bg-gray-900 border-gray-800 col-span-full">
          <Text className="text-gray-300 text-lg font-semibold mb-4">
            Resultados del Escaneo
          </Text>
          <BarChart
            className="h-72"
            data={scanResults}
            index="category"
            categories={["value"]}
            colors={["blue"]}
            valueFormatter={(value) => value.toLocaleString()}
            showAnimation={true}
            showGridLines={false}
            showLegend={false}
          />
        </Card>
      </Grid>

      {/* Usage Instructions */}
      <Card className="bg-gradient-to-r from-red-950 to-red-900 border-red-800">
        <Text className="text-white text-sm">
          <strong>💡 Tip:</strong> Estos son los componentes de <code>@tremor/react</code>. 
          Para usar en el Dashboard principal, reemplaza los gráficos de Recharts en{' '}
          <code>/src/app/components/Dashboard.tsx</code> con estos componentes de Tremor.
        </Text>
      </Card>
    </div>
  );
}

/**
 * Integration Steps:
 * 
 * 1. Import Tremor components in Dashboard.tsx:
 *    import { Card, AreaChart, Metric } from '@tremor/react';
 * 
 * 2. Replace Recharts components:
 *    <AreaChart /> instead of <ResponsiveContainer><AreaChart>...</AreaChart></ResponsiveContainer>
 * 
 * 3. Update data format (Tremor uses simpler structure)
 * 
 * 4. Add Tremor CSS (already included in package)
 * 
 * 5. Enjoy cleaner code and better-looking charts!
 */

// Tremor Custom Theme for Shield-Master 2026
export const tremorTheme = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    ring: '#3b82f6',
  },
  dark: {
    background: '#000000',
    border: '#1f2937',
    ring: '#ef4444',
  },
};
