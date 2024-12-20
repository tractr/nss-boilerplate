import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getIndicatorState } from '@/hooks/use-indicator';
import { GeneralIndicator } from '@/types/database';
import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface StatisticsProps {
  data: GeneralIndicator[];
  period: '30' | '90' | '180';
  onPeriodChange: (value: '30' | '90' | '180') => void;
}

export function Statistics({ data, period, onPeriodChange }: StatisticsProps) {
  const barData = useMemo(() => {
    if (!data) return [];

    const colorMap = {
      noData: 'hsl(0 0% 96%)',
      bad: 'hsl(353 96% 45%)',
      poor: 'hsl(25 85% 54%)',
      average: 'hsl(47 95% 58%)',
      good: 'hsl(92 64% 44%)',
      excellent: 'hsl(207 83% 41%)',
      unknown: 'hsl(0 0% 50%)',
    };

    return data.map(item => ({
      date: new Date(item.day!),
      value: item.general_value || 0,
      color:
        colorMap[
          getIndicatorState(
            item.general_indicator as 0 | 1 | 2 | 3 | 4 | 5,
            item.general_value || 0
          ) as keyof typeof colorMap
        ],
    }));
  }, [data]);

  const getXAxisInterval = (period: string) => {
    switch (period) {
      case '30':
        return 5;
      case '90':
        return 10;
      case '180':
        return 20;
      default:
        return 5;
    }
  };

  const indicators = ['noData', 'bad', 'poor', 'average', 'good', 'excellent'];
  const donutData = indicators
    .map(indicator => {
      const colorMap = {
        noData: 'hsl(0 0% 96%)',
        bad: 'hsl(353 96% 45%)',
        poor: 'hsl(25 85% 54%)',
        average: 'hsl(47 95% 58%)',
        good: 'hsl(92 64% 44%)',
        excellent: 'hsl(207 83% 41%)',
        unknown: 'hsl(0 0% 50%)',
      };

      const count = data
        .slice(-parseInt(period))
        .filter(
          day =>
            getIndicatorState(
              day.general_indicator as 0 | 1 | 2 | 3 | 4 | 5,
              day.general_value || 1
            ) === indicator
        ).length;

      const percentage = (count / parseInt(period)) * 100;

      return percentage > 0
        ? {
            name: indicator,
            value: percentage,
            color: colorMap[indicator as keyof typeof colorMap],
          }
        : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const getChartWidth = (period: string) => {
    const baseBarWidth = 10;
    const spacing = 4;
    return parseInt(period) * (baseBarWidth + spacing);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h2 className="text-xl font-bold uppercase">Statistiques</h2>
        <Select
          value={period}
          onValueChange={(value: '30' | '90' | '180') => onPeriodChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 jours</SelectItem>
            <SelectItem value="90">90 jours</SelectItem>
            <SelectItem value="180">6 mois</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-2 text-center">Historique</h3>
          <div className="h-[300px] w-full overflow-hidden">
            <div className="overflow-x-auto -ml-4">
              <BarChart
                width={getChartWidth(period)}
                height={300}
                data={barData}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  interval={getXAxisInterval(period)}
                  tickFormatter={(value: Date) => {
                    return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}`;
                  }}
                />
                <YAxis
                  max={10}
                  min={0}
                  domain={[0, 10]}
                  interval={0}
                  tickFormatter={value => `${value}`}
                  allowDataOverflow={true}
                />
                <RechartsTooltip
                  formatter={(value: number) => [value.toFixed(2), 'MWI']}
                  labelFormatter={(label: Date) => {
                    return label.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                />
                <Bar dataKey="value" barSize={10} radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-2 text-center">Répartition des indicateurs</h3>
          <div className="h-[300px] w-full flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={donutData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                label={({ value }) => `${value.toFixed(1)}%`}
                labelLine={false}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value: number, name: string) => {
                  const nameMap: Record<string, string> = {
                    noData: 'Pas de données',
                    bad: 'Mauvais',
                    poor: 'Médiocre',
                    average: 'Moyen',
                    good: 'Bon',
                    excellent: 'Excellent',
                  };
                  return [`${nameMap[name] || name}: ${value}%`];
                }}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
